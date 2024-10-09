import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from 'react-query'
import api from '../interceptors/axios.js'
import { Riple } from "react-loading-indicators"


function ProtectedRoutes() {
    const { isLoading, error, data: authUser } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const res = await api.get('/user/authUser');
            //  console.log(res.data);
            return res.data;

        },
        retry: false
    })


    if (isLoading) {
        return (<div style={{textAlign: 'center', marginTop: '20px  '}}>
            <Riple color="black" size="small" text="" textColor="#ffd7d7" />
        </div>
        )
    }
    if (error) {
        console.log(error);
        return <Navigate to='/' replace={true} />
    }


    return (
        authUser?.isAuthorized ? <Outlet /> : <Navigate to='/' replace={true} />
    )
}

export default ProtectedRoutes