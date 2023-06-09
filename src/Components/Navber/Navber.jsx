import React, { useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { HiMenuAlt4 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Icons from '../../constants/Icons';
import { VendersContext } from './../../context/Store';
import './Navber.scss';


function Navber() {
  let { LogOut, isOpen, setIsOpen, isLang, setIsLang } = useContext(VendersContext);

  const handleActionSelect = async (action) => {
    if (action === 'en') {
      setIsLang('en')
    } else if (action === 'ar') {
      setIsLang('ar')
    }
  }





  return (
    <>
      <Navbar className='bg-light navSubMain'>
        <Container fluid  >
          <Navbar.Collapse  >
            <div className={`app__navbar-menu ${isLang === 'ar' ? 'ms-2 ' : 'me-2'}`}>
              <HiMenuAlt4 onClick={() => setIsOpen(!isOpen)} />
            </div>

            <span className='chang__lang '>

              <DropdownButton
                id={`dropdown-1`}
                title={
                  <>
                    <Icons.Language size={17} /> {isLang === 'ar' ? 'تغييـر اللغـة' : 'Change Lang'}
                  </>
                }
                variant="outline-"
                onSelect={(eventKey) => handleActionSelect(eventKey)}
                className={`DropdownButton`}
                style={{ left: isLang === 'ar' ? '-30px' : '0px' }}
              >
                <Dropdown.Item eventKey="ar"    >عربي</Dropdown.Item>
                <Dropdown.Item eventKey="en"    >English</Dropdown.Item>
              </DropdownButton>

            </span>
          </Navbar.Collapse>

          <Navbar.Toggle />

          <Navbar.Collapse className="navEnd justify-content-end">

            <nav className='d-flex flex-row justify-content-center align-items-center'>
              <div className="dropdown" id="basic-nav-dropdown2">

                <div className="btn btn__avatar-nav dropdown-toggle border-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem('UserName')?.charAt(0)?.toUpperCase()}
                </div>
                <ul className={`dropdown-menu ${isLang === 'ar' ? 'text-start' : 'text-end'}`} style={{ left: isLang === 'ar' ? '0' : '-120px', zIndex: 99999, top: '47px' }}>
 
                  <li>
                    <Link to={'/admin/login'} onClick={LogOut} className="dropdown-item" >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className={isLang === 'ar' ? 'ms-2' : 'me-2'} src={Icons.logout} alt="logout" width={18} height={18} />
                        <span>
                          {isLang === 'ar' ? 'تسجيـل الخروج' : 'Logout'}
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Navber