import React from 'react'
import styles from '../components/css modules/Settings.module.css'
import profile from '../assets/profile.png'
import { User, LogOut, SquareX } from 'lucide-react';

function Settings({onSettingsClickFunc, onProfileClickFunc}) {
    return (
        <div className={styles.settingsDiv}>
            <p className={styles.settingsClose}><SquareX onClick={onSettingsClickFunc}/></p>
            <div className={styles.settingsHeader}>
                <img src={profile} alt="profile" />
                <p>Mayank Kumar</p>
            </div>
            <div className={styles.settingsOptions}>
                <div className={styles.settingsOption}><span onClick={onProfileClickFunc}><User /> Profile</span></div>
                <div className={styles.settingsOption}><span><LogOut /> Logout</span></div>
            </div>

        </div>
    )
}

export default Settings