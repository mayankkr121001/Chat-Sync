import React from 'react'
import chatVector from '../assets/chatVector.jpg'
import styles from './css modules/ChangeProfilePic.module.css'
import { SquareX } from 'lucide-react'

function ChangeProfilePic({onChangeProfilePicClickFunc}) {
  return (
    <div className={styles.changeProfilePic}>
      <p className={styles.changeProfilePicClose}><SquareX onClick={onChangeProfilePicClickFunc}/></p>
      <div className={styles.changeProfilePicUploadBtnDiv}>
        <input type="file" className={styles.changeProfilePicUploadBtn} />
      </div>
        <div className={styles.changeProfilePicArea}>
            <img src={chatVector} alt="img" />
        </div>
        <div className={styles.changeProfilePicBtnDiv}>
            <button className={styles.changeProfilePicBtn}>Change</button>
        </div>
    </div>
  )
}

export default ChangeProfilePic