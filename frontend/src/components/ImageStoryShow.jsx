import React, { useState, useRef, useEffect } from 'react'
import styles from './css modules/ImageStoryShow.module.css'
import { useMutation, useQueryClient } from 'react-query';
import { SquareX } from 'lucide-react';
import api from '../interceptors/axios.js';
// import chatVector from '../assets/chatVector.jpg'
// import checkStory from '../assets/checkStory.jpg'
// import testVideo from '../assets/testVideo.mp4'

function ImageStoryShow({user, onImgStoryClose}) {
  const [ownStoryFlag, setOwnStoryFlag] = useState(false);
  const videoRef = useRef(null);

  const queryClient = useQueryClient();

  const userId = queryClient.getQueryData('currUser')?._id;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    if(user._id === userId){
      setOwnStoryFlag(true);
    }
  }, []);


  let isImage;
  let isVideo;

  if(user.story){
    isImage = user?.story.match(/\.(jpeg|jpg|gif|png|webp)$/i);
    isVideo = user?.story.match(/\.(mp4|webm|ogg)$/i);
  }


 

  const deleteStoryMutation = useMutation({
    mutationFn: async ()=>  {
      return await api.delete('/user/deleteStory')
    },
    onSuccess: (data)=>{
      // console.log(data);   
      onImgStoryClose();
      queryClient.invalidateQueries('currUser');    
    }
  })


  const onOwnStorydeleteClick = ()=>{
    deleteStoryMutation.mutate();
  }


  return (
    <div className={styles.imageStoryDiv}>
      <div className={styles.imageStoryHeader}>
        {/* <p className={styles.imageStoryHeaderText}>Image Story</p> */}
        {ownStoryFlag && <button onClick={onOwnStorydeleteClick} className={styles.imageStoryHeaderDeleteBtn}>Delete Story</button> }
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