import React, { useRef, useEffect } from 'react'
import styles from './css modules/ImageStoryShow.module.css'
import { SquareX } from 'lucide-react';
import chatVector from '../assets/chatVector.jpg'
import checkStory from '../assets/checkStory.jpg'
import testVideo from '../assets/testVideo.mp4'

function ImageStoryShow() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);


  return (
    <div className={styles.imageStoryDiv}>
      <div className={styles.imageStoryHeader}>
        <p className={styles.imageStoryHeaderText}>Image Story</p>
        <p className={styles.imageStoryHeaderClose}><SquareX /></p>
      </div>
      <div className={styles.imageStoryShowArea}>
        <div className={styles.imageStoryShowDiv}>
          {/* <img src={chatVector} alt="image" /> */}
          <img src={checkStory} alt="image" />
          {/* <video ref={videoRef} autoPlay muted controls loop>
            <source src={testVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
      </div>
    </div>
  )
}

export default ImageStoryShow