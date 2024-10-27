import React, {useState} from 'react'
import styles from './css modules/MessageSendReceived.module.css'
import chatVector from '../assets/chatVector.jpg'
import dateFormat from "dateformat";

function MessageSend({ content, type, time }) {
  const timeFormat = new Date(time);
  const messageDate = dateFormat(timeFormat, "longDate");
  const messageTime = dateFormat(timeFormat, "shortTime");


  return (
    <div className={styles.messageSendContainer}>
      <div className={styles.messageSendDiv}>
        <div className={styles.messageSendBox}>

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

          {type === "document" && <p>Document file -<a href={content} target="_blank">{content}</a></p>}

        </div>
        <div className={styles.messageSendTime}>{messageDate} {messageTime}</div>
      </div>
    </div >
  )
}

export default MessageSend