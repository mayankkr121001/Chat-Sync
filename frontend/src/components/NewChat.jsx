import React from 'react'
import styles from './css modules/NewChat.module.css'
import profile from '../assets/profile.png'
import { SquareX } from 'lucide-react'

function NewChat({onNewChatClickFunc}) {
    return (
        <div className={styles.newChatDiv}>
            <div className={styles.newChatHeader}>
                <p className={styles.newChatHeaderText}>New Chat</p>
                <p className={styles.newChatHeaderClose}><SquareX onClick={onNewChatClickFunc}/></p>
            </div>
            <div className={styles.newChatSearchInputDiv}>
                <input type="text" placeholder="Search" className={styles.newChatSearchInput} />
            </div>
            <div className={styles.newChatSearchedAccountsDiv}>
                <div className={styles.newChatSearchedAccount}>
                    <img src={profile} alt="profile" />
                    <p className={styles.newChatSearchedAccountName}>Avinandan Bhandari</p>
                </div>
                <div className={styles.newChatSearchedAccount}>
                    <img src={profile} alt="profile" />
                    <p className={styles.newChatSearchedAccountName}>Adnan Azad</p>
                </div>
                <div className={styles.newChatSearchedAccount}>
                    <img src={profile} alt="profile" />
                    <p className={styles.newChatSearchedAccountName}>John Doe</p>
                </div>
            </div>
        </div>
    )
}

export default NewChat