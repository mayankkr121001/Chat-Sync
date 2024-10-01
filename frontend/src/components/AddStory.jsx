import React, { useRef, useEffect } from 'react'
import styles from './css modules/AddStory.module.css'
import { SquareX } from 'lucide-react';
import chatVector from '../assets/chatVector.jpg'
import checkStory from '../assets/checkStory.jpg'
import testVideo from '../assets/testVideo.mp4'
function AddStory() {
    const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.play();
        // videoRef.current.muted = false;
    }
  }, []);

  return (
    <div className={styles.addStoryDiv}>
      <div className={styles.addStoryHeader}>
        <p className={styles.addStoryHeaderText}>Add Story</p>
        <input type="file" className={styles.addStoryUploadBtn} accept="image/*,video/*" />
        <p className={styles.addStoryHeaderClose}><SquareX /></p>
      </div>
      <div className={styles.addStoryShowArea}>
        <div className={styles.addStoryShowDiv}>
          <img src={chatVector} alt="image" />
          {/* <img src={checkStory} alt="image" /> */}
          {/* <video ref={videoRef} autoPlay muted controls loop>
            <source src={testVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
      </div>
      <div className={styles.addStoryAddBtnDiv}>
        <button className={styles.addStoryAddBtn}>Add Story</button>
      </div>
    </div>
  )
}

export default AddStory