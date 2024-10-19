import React from 'react'
import styles from '../components/css modules/Settings.module.css'
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from  '../interceptors/axios.js'
import profile from '../assets/profile.png'
import { User, LogOut, SquareX } from 'lucide-react';

function Settings({onSettingsClose, onProfileClickFunc}) {

    const queryClient = useQueryClient();
    
    const userData = queryClient.getQueryData('currUser');

    const navigate = useNavigate();
    const onlogoutClickFunc = async  ()=>{
        await api.post('/user/logout')
        .then(res=>{
            if(res.status === 200){
                navigate('/');
            }
        })
        .catch(error=> {
            console.log(error);
        })
    }

    return (
        <div className={styles.settingsDiv}>
            <p className={styles.settingsClose}><SquareX onClick={onSettingsClose}/></p>
            <div className={styles.settingsHeader}>
                {userData?.profileImage ? <img src={userData.profileImage} alt="profile" />
                :<img src={profile} alt="profile" />}
                <p>{userData.name}</p>
            </div>
            <div className={styles.settingsOptions}>
                <div className={styles.settingsOption}><span onClick={onProfileClickFunc}><User /> Profile</span></div>
                <div className={styles.settingsOption}><span onClick={onlogoutClickFunc}><LogOut /> Logout</span></div>
            </div>

        </div>
    )
}

export default Settings