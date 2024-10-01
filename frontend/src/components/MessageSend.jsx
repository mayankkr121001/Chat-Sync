import React from 'react'
import styles from './css modules/MessageSendReceived.module.css'
import chatVector from '../assets/chatVector.jpg'

function MessageSend({ text }) {
  return (
    <div className={styles.messageSendDiv}>
      <div className={styles.messageSendBox}>
        {/* <img src={chatVector} alt="img" /> */}
        <p>{text}</p>
      </div>
      <div className={styles.messageSendTime}>3:00 pm</div>
    </div>
  )
}

export default MessageSend