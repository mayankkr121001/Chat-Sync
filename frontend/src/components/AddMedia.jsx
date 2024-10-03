import React, { useRef, useEffect } from 'react'
import styles from './css modules/AddMedia.module.css'
import { SquareX } from 'lucide-react';
import chatVector from '../assets/chatVector.jpg'
import checkStory from '../assets/checkStory.jpg'
import testVideo from '../assets/testVideo.mp4'


function AddMedia({onAddMediaClickFunc}) {
    const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.play();
        // videoRef.current.muted = false;
    }
  }, []);

  return (
    <div className={styles.addMediaDiv}>
      <div className={styles.addMediaHeader}>
        <p className={styles.addMediaHeaderText}>Add Media</p>
        <input type="file" className={styles.addMediaUploadBtn} accept="image/*,video/*"/>
        <p className={styles.addMediaHeaderClose}><SquareX onClick={onAddMediaClickFunc}/></p>
      </div>
      <div className={styles.addMediaShowArea}>
        <div className={styles.addMediaShowDiv}>
          <img src={chatVector} alt="image" />
          {/* <img src={checkStory} alt="image" /> */}
          {/* <video ref={videoRef} autoPlay muted controls loop>
            <source src={testVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
      </div>
      <div className={styles.addMediaSendBtnDiv}>
        <button className={styles.addMediaSendBtn}>Send</button>
      </div>
    </div>
  )
}

export default AddMedia