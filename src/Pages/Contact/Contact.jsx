import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../../utils/useFetch';
import useSkeletonTable from '../../utils/useSkeletonTable';
import DataView from './DataView';

const Contact = () => {

    let { getContactUsDataShared, checkTokenVerify, checkTokenRefresh, data, isLoading } = useFetch()
    let { SkeletonTable } = useSkeletonTable()

    // get Verify Data
    const getVerifyData = async () => {
        try {
            // Get Client
            await checkTokenVerify(localStorage.getItem('accessToken'))
                .then(({ data }) => {
                    if (Object.keys(data).length === 0) {
                        getContactUsData()
                    } else {
                        getTokenRefresh()
                    }
                })
                .catch((error) => {
                    // setClient([]);
                });
        } catch (error) {
            console.log(error);
        }
    };

    //  get ContactUs Data
    const getContactUsData = async () => {
        try {
            getContactUsDataShared(1)
        } catch (error) {
            console.log(error);
        }
    };

    // get new token
    const getTokenRefresh = async () => {
        try {
            // Get Client
            await checkTokenRefresh(localStorage.getItem('refreshToken'))
                .then(({ data }) => {
                    getContactUsData()
                })
                .catch((error) => {
                    console.log(error); 
                });
        } catch (error) {
            console.log(error);
        }
    }; 

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getVerifyData()
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [])


    if (isLoading) return SkeletonTable()

    return (
        <>
            <div>
                <InfiniteScroll
                    dataLength={data.length}
                    next={getContactUsData}
                    hasMore={true}
                    loader={<h4>{isLoading ? 'Loading...' : 'Scroll to load more'}</h4>}
                >
                    <DataView data={data} />
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Contact
