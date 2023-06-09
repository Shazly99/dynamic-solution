import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Img from '../../../assets/Img';
import LogoSvg from '../../../assets/svg/LogoSvg';
import "./login.scss";
import CircularProgress from '@mui/material/CircularProgress';
import { apiheader } from '../../../utils/fetchData';


let validationSchemaEmail = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('password is required').min(3, 'password must be at least 3 characters long').max(10, 'password must be at most 10 characters long'),
});

const Login = () => {
    const [loademail, setLoadEmail] = useState(false);

    let navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchemaEmail,
        onSubmit: async (values) => {
            if (values) {
                setLoadEmail(true)

                let { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, values, apiheader);

                if (data.is_superuser === true) {
                    console.log(data.last_name);
                    localStorage.setItem("accessToken", data.access);
                    localStorage.setItem("refreshToken", data.refresh);
                    localStorage.setItem("UserName", data.last_name);
                    toast.success('Logged in successfully');
                    navigate('/');
                } else {
                    setTimeout(() => {
                        setLoadEmail(false)
                    }, 1500);
                    toast.error(data.ApiMsg);

                }
            }
        }
    });

    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const isValidForm = Object.values(formik.errors).every((val) => !val);
        setIsValid(isValidForm);
    }, [formik.errors]);


    return (
        <>
            <div className="app__login">
                <Container fluid >
                    <Row className='d-flex justify-content-center align-content-center '>
                        <Col xl={6} lg={6} xd={6} sm={12} className='vh-100'>
                            <div className='app__login-left  vh-100   '>
                                <div className="app__login-left bg__login shadow">
                                    <img loading="lazy" src={Img.loginBg} width={'15px'} height={'15px'} alt="Login page background" />
                                    <div className="login__form_inputs  " >
                                        <form className='login__form' onSubmit={formik.handleSubmit}>
                                            <div className="email ">
                                                <label htmlFor="email" >Email</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    placeholder="Email"
                                                    className={`  py-2 form-control border-0   `} />

                                                {formik.errors.email ? <span className='error__handel' >{formik.errors.email}</span> : null}
                                            </div>
                                            <div className="email ">
                                                <label htmlFor="password">password</label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.password}
                                                    className={`  py-2 form-control border-0   `}
                                                    placeholder='password'
                                                />
                                                {formik.errors.password ? <span className='error__handel'>{formik.errors.password}</span> : null}
                                            </div>
                                            <div className='w-100  d-flex align-items-center justify-content-center'>
                                                <button disabled={!isValid} className={`${!isValid ? 'app__login-btn opisity ' : 'app__login-btn opisity1'} mt-3 `} type='submit'>
                                                    {loademail ? <CircularProgress size={18} className={'customProgress'} /> :
                                                        <LogoSvg.ArrowRight className='app__login-btn-icons ' />
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login
