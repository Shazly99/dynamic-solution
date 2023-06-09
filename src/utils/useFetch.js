import { useState } from 'react';
import { GetData, PostData, apiheader } from './fetchData';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    //  get ContactUs Data
    const getContactUsDataShared = async () => {
        try {
            // Get Client
            await getAllContactUsClients(currentPage)
                .then((data) => {
                    setData(prevData => [...prevData, ...data?.results]);
                    setCurrentPage(prevPage => prevPage + 1);
                    setIsLoading(false)
                })
                .catch((error) => {
                    // setClient([]);
                });
        } catch (error) {
        }
    };

    //   check token is vaid or not vaid
    const checkTokenVerify = async (accessToken) => {
        try {
            const tokenVerify = await PostData(`${process.env.REACT_APP_API_URL}/token/verify/`,
                {
                    token: accessToken
                })
                .then((data) => {
                    return data;
                });
            return tokenVerify;
        } catch (error) {
            getTokenRefresh()
            return;
        }
    };

    // Get  ContactUs Clients Service
    const getAllContactUsClients = async (page) => {
        try {
            const contactes = await GetData(`${process.env.REACT_APP_API_URL}/contact/?page=${page}`, apiheader)
                .then((data) => {
                    return data;
                });
            return contactes;
        } catch (error) {
            await getTokenRefresh()
            await getAllContactUsClients()
            return;
        }
    };

    // get new access token
    const getTokenRefresh = async () => {

        try {
            // Get Client
            await checkTokenRefresh(localStorage.getItem('refreshToken'))
                .then(({ data }) => {
                    localStorage.setItem("accessToken", data.access);
                    getContactUsDataShared(1)
                })
        } catch (error) {
        }
    };

    //   Get New token replace access token
    const checkTokenRefresh = async (token) => {
        try {
            const tokenVerify = await PostData(`${process.env.REACT_APP_API_URL}/token/refresh/`,
                {
                    refresh: token
                })
                .then((data) => {
                    return data;
                });
            return tokenVerify;
        } catch (error) {
            return;
        }
    };

    return {
        getAllContactUsClients,
        checkTokenVerify,
        checkTokenRefresh,
        getContactUsDataShared,
        data,
        isLoading
    }
}


export default useFetch;
