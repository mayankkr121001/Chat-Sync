import React from 'react'
import styles from './css modules/Profile.module.css'
import profile from '../assets/profile.png'
import { Pencil, Check, SquareX } from 'lucide-react'

function Profile() {
    return (
        <div className={styles.profileDiv}>
            <p className={styles.profileClose}><SquareX /></p>
            <div className={styles.profileImage}>
                <img src={profile} alt="profile" />
                <div className={styles.profileImageEdit}>
                    <span><Pencil size={18} /></span>
                    {/* <div className={styles.profileImageEditOptions}>
                        <p>Change</p>
                        <p>Remove</p>
                        </div> */}
                </div>
            </div>
            <div className={styles.profileBody}>
                <p>Name</p>
                <div className={styles.prifileBodyName}>
                    <p>Mayank Kumar</p>
                    <span className={styles.profileBodyNameEdit}><Pencil size={18} /></span>
                    {/* <input type="text" placeholder='name' />
                    <span className={styles.profileBodyNameSave}><Check size={25}/></span> */}
                </div>
            </div>
        </div>
    )
}

export default Profile