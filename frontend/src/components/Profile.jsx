import React, { useState } from 'react'
import styles from './css modules/Profile.module.css'
import profile from '../assets/profile.png'
import { Pencil, SquareX, Check } from 'lucide-react'

function Profile({onProfileClickFunc, onChangeProfilePicClickFunc}) {
    const [profileImageEdit, setProfileImageEdit] = useState(false)
    const [profileNameEdit, setProfileNameEdit] = useState(false)

    const onProfileImageEditMouseOverFunc = () => {
        setProfileImageEdit(true)
    }
    const onProfileImageEditMouseLeaveFunc = () => {
        setProfileImageEdit(false)
    }
    return (
        <div className={styles.profileDiv}>
            <p className={styles.profileClose}><SquareX onClick={onProfileClickFunc}/></p>
            <div className={styles.profileImage}>
                <img src={profile} alt="profile" />
                <div className={styles.profileImageEdit}>
                    <span onMouseOver={onProfileImageEditMouseOverFunc} ><Pencil size={18} /></span>
                    {profileImageEdit && <div className={styles.profileImageEditOptions} onMouseLeave={onProfileImageEditMouseLeaveFunc}>
                        <p onClick={onChangeProfilePicClickFunc}>Change</p>
                        <p>Remove</p>
                        </div>}
                </div>
            </div>
            <div className={styles.profileBody}>
                <p>Name</p>
                {(profileNameEdit === false) ? <div className={styles.prifileBodyName}>
                    <p>Mayank Kumar</p>
                    <span className={styles.profileBodyNameEdit}><Pencil size={18} onClick={() => setProfileNameEdit(true)}/></span>
                </div>:
                <div className={styles.prifileBodyName}>
                    <input type="text" placeholder='name' />
                    <span className={styles.profileBodyNameSave}><Check size={25}/></span>
                </div>}
            </div>
        </div>
    )
}

export default Profile