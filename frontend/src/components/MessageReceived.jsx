import React from 'react'
import styles from './css modules/MessageSendReceived.module.css'
import chatVector from '../assets/chatVector.jpg'

function MessageReceived({ text }) {
  return (
    <div className={styles.messageReceivedDiv}>
      <div className={styles.messageReceivedBox}>
        {/* <img src={chatVector} alt="img" /> */}
        <p>{text}</p>
      </div>
      <div className={styles.messageReceivedTime}>3:00 pm</div>
    </div>
  )
}

export default MessageReceived