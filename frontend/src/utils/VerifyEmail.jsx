import React, {useEffect} from 'react'
import api from '../interceptors/axios.js'
import { useLocation , useNavigate} from 'react-router-dom'
// import { useQuery } from 'react-query';

function VerifyEmail() {
    const location = useLocation();

    console.log('Verification ...')
    
    const navigate = useNavigate()
    useEffect(()=>{
        const verifyEmail = async()=>{
            const token = new URLSearchParams(location.search).get('token');
            console.log("token:", token)
            if(!token) return;

            try {
                const response = await api.get(`/user/verify-email?token=${token}`)
                // console.log(response);
                if(response.status === 200){
                    navigate("/")
                    alert("Email verified successfully");
                }
            } catch (error) {
                console.log("Error verifying email", error)
            }
        }

        verifyEmail();
    }, [location])


  return (
    <div>Email verification in progress...</div>
  )
}

export default VerifyEmail