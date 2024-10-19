import React, { useRef, useEffect, useState } from 'react'
import styles from './css modules/AddStory.module.css'
import { SquareX } from 'lucide-react';
import { useMutation , useQueryClient} from 'react-query';
import api from '../interceptors/axios.js';
import { Riple } from "react-loading-indicators"
// import chatVector from '../assets/chatVector.jpg'
// import checkStory from '../assets/checkStory.jpg'
// import testVideo from '../assets/testVideo.mp4'


function AddStory({ onAddStoryClose }) {
  const [media, setMedia] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [imageFlag, setImageFlag] = useState(false);
  const [videoFlag, setVideoFlag] = useState(false);

  const onMediaInput = (e) => {
    setMediaPreview(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    // console.log(file.type);

    if (file.type.startsWith('image/')) {
      setImageFlag(true);
      setVideoFlag(false);
    }
    else if (file.type.startsWith('video/')) {
      setVideoFlag(true);
      setImageFlag(false);
    }
    setMedia(e.target.files[0]);
  }

  const queryClient = useQueryClient();

  const storyMutation = useMutation({
    mutationFn: async (newData) => {
      return await api.post('/user/addStory', newData)
    },
    onSuccess: (res) => {
      // console.log(res);
      onAddStoryClose();
      queryClient.invalidateQueries('currUser');
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const onAddStoryBtnClick = () => {
    const formData = new FormData();
    formData.append('story', media);

    storyMutation.mutate(formData)
  }

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
        <input type="file" onChange={onMediaInput} className={styles.addStoryUploadBtn} accept="image/*,video/*" />
        <p className={styles.addStoryHeaderClose}><SquareX onClick={onAddStoryClose} /></p>
      </div>
      {storyMutation.isLoading && <div style={{ textAlign: 'center' }}><Riple color="#ffffff" size="small" text="" textColor="#ffd7d7" /></div>}
      <div className={styles.addStoryShowArea}>
        <div className={styles.addStoryShowDiv}>
          {imageFlag && <img src={mediaPreview} alt="image" />}
          {videoFlag && <video ref={videoRef} autoPlay muted controls loop>
            <source src={mediaPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>}
        </div>
      </div>
      <div className={styles.addStoryAddBtnDiv}>
        <button onClick={onAddStoryBtnClick} className={styles.addStoryAddBtn}>Add Story</button>
      </div>
    </div>
  )
}

export default AddStory