import React, { useRef, useEffect } from 'react'
import styles from './css modules/ImageStoryShow.module.css'
import { SquareX } from 'lucide-react';
import chatVector from '../assets/chatVector.jpg'
import checkStory from '../assets/checkStory.jpg'
import testVideo from '../assets/testVideo.mp4'

function ImageStoryShow({user, onImgStoryClose}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);


  let isImage;
  let isVideo;

  if(user.story){
    isImage = user?.story.match(/\.(jpeg|jpg|gif|png|webp)$/i);
    isVideo = user?.story.match(/\.(mp4|webm|ogg)$/i);
  }


  return (
    <div className={styles.imageStoryDiv}>
      <div className={styles.imageStoryHeader}>
        {/* <p className={styles.imageStoryHeaderText}>Image Story</p> */}
        <p className={styles.imageStoryHeaderClose}><SquareX onClick={onImgStoryClose} /></p>
      </div>
      <div className={styles.imageStoryShowArea}>
        <div className={styles.imageStoryShowDiv}>
          {isImage && <img src={user.story} alt="image" />}
          {isVideo && <video ref={videoRef} autoPlay muted controls loop>
            <source src={user.story} type="video/mp4" />
            Your browser does not support the video tag.
          </video>}
        </div>
      </div>
    </div>
  )
}

export default ImageStoryShow