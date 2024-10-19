import React, { useState } from 'react'
import styles from './css modules/Profile.module.css'
import { useQueryClient, useMutation } from 'react-query'
import profile from '../assets/profile.png'
import api from '../interceptors/axios.js'
import { Riple } from "react-loading-indicators"
import { Pencil, SquareX, Check } from 'lucide-react'

function Profile({ onProfileClose, onChangeProfilePicClickFunc }) {
    const [profileImageEdit, setProfileImageEdit] = useState(false);
    const [profileNameEdit, setProfileNameEdit] = useState(false);

    const [newName, setNewName] = useState("");

    const onProfileImageEditMouseOverFunc = () => {
        setProfileImageEdit(true)
    }
    const onProfileImageEditMouseLeaveFunc = () => {
        setProfileImageEdit(false)
    }

    const queryClient = useQueryClient();

    const userData = queryClient.getQueryData('currUser');
    // console.log(userData);

    const profileImageDeleteMutation = useMutation({
        mutationFn: async () => {
            return await api.delete('/user/deleteProfileImage')
        },
        onSuccess: (res) => {
            
            queryClient.invalidateQueries(['currUser']);
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const onRemoveProfilePicClickFunc = async () => {
        profileImageDeleteMutation.mutate();
    }


    const nameMutation = useMutation({
        mutationFn: async (newData) => {
            return await api.put('/user/updateName', newData)
        },
        onSuccess: (res) => {
            // console.log(res);
            setProfileNameEdit(false);
            queryClient.invalidateQueries(['currUser']);
        },
        onError: (err) => {
            console.log(err);
        }

    })
    const onNameUpdateFunc = () => {
        nameMutation.mutate({ name: newName })
    }

    return (
        <div className={styles.profileDiv}>
            <p className={styles.profileClose}><SquareX onClick={onProfileClose} /></p>
            {(profileImageDeleteMutation.isLoading || nameMutation.isLoading) && <div style={{ textAlign: 'center' }}><Riple color="#ffffff" size="small" text="" textColor="#ffd7d7" /></div>}
            <div className={styles.profileImage}>
                {userData?.profileImage ? <img src={userData.profileImage} alt="profile" />
                    : <img src={profile} alt="profile" />}
                <div className={styles.profileImageEdit}>
                    <span onMouseOver={onProfileImageEditMouseOverFunc} ><Pencil size={18} /></span>
                    {profileImageEdit && <div className={styles.profileImageEditOptions} onMouseLeave={onProfileImageEditMouseLeaveFunc}>
                        <p onClick={onChangeProfilePicClickFunc}>Change</p>
                        <p onClick={onRemoveProfilePicClickFunc}>Remove</p>
                    </div>}
                </div>
            </div>
            <div className={styles.profileBody}>
                <p>Name</p>
                {(profileNameEdit === false) ? <div className={styles.prifileBodyName}>
                    <p>{userData.name}</p>
                    <span className={styles.profileBodyNameEdit}><Pencil size={18} onClick={() => setProfileNameEdit(true)} /></span>
                </div> :
                    <div className={styles.prifileBodyName}>
                        <input onChange={e => setNewName(e.target.value)} type="text" placeholder='name' />
                        <span onClick={onNameUpdateFunc} className={styles.profileBodyNameSave}><Check size={25} /></span>
                    </div>}
            </div>
        </div>
    )
}

export default Profile