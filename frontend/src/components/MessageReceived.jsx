import React from 'react'
import styles from './css modules/MessageSendReceived.module.css'
import chatVector from '../assets/chatVector.jpg'
import dateFormat from "dateformat";


function MessageReceived({ content, type, time }) {
  const timeFormat = new Date(time)
  const messageDate = dateFormat(timeFormat, "longDate");
  const messageTime = dateFormat(timeFormat, "shortTime");

  // console.log(type);


  return (
    <div className={styles.messageReceivedContainer}>
      <div className={styles.messageReceivedDiv}>
        <div className={styles.messageReceivedBox}>

          {type === "text" && <p>{content}</p>}

          {type === "image" && <img src={content} alt="img" />}

          {type === "video" && <video ref={videoRef} controls >
            <source src={content} type="video/mp4" />
            <source src={content} type="video/ogg" />
            Your browser does not support the video tag.
          </video>}

          {type === "audio" && <audio controls>
            <source src={content} type="audio/ogg" />
            <source src={content} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>}
          
        </div>
        <div className={styles.messageReceivedTime}>{messageDate} {messageTime}</div>
      </div>
    </div>
  )
}

export default MessageReceived