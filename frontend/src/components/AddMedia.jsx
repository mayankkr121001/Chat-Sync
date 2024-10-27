import React, { useState, useRef, useEffect } from 'react'
import styles from './css modules/AddMedia.module.css'
import { SquareX } from 'lucide-react';
import { socket } from '../socket/socket.js';
import { useQueryClient } from 'react-query';
// import chatVector from '../assets/chatVector.jpg'
// import checkStory from '../assets/checkStory.jpg'
// import testVideo from '../assets/testVideo.mp4'


function AddMedia({ userForMessage, onAddMediaClose }) {
  const [media, setMedia] = useState("")
  const [mediaPreview, setMediaPreview] = useState("");
  const [type, setType] = useState('');
  const [imageFlag, setImageFlag] = useState(false);
  const [videoFlag, setVideoFlag] = useState(false);
  const [audioFlag, setAudioFlag] = useState(false);
  const [documentFlag, setDocumentFlag] = useState(false);


  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      // videoRef.current.muted = false;
    }
  }, []);


  const onMediaInput = (e) => {
    setMediaPreview(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    // console.log(file.type);

    const isDocument = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/rtf',
    ].includes(file?.type);

    if (file.type.startsWith('image/')) {
      setType('image');
      setImageFlag(true);
      setVideoFlag(false);
      setAudioFlag(false);
      setDocumentFlag(false);
    }
    else if (file.type.startsWith('video/')) {
      setType('video')
      setVideoFlag(true);
      setImageFlag(false);
      setAudioFlag(false);
      setDocumentFlag(false);
    }
    else if (file.type.startsWith('audio/')) {
      setType('audio')
      setAudioFlag(true);
      setImageFlag(false);
      setVideoFlag(false);
      setDocumentFlag(false);
    }
    else if(isDocument){
      setType('document')
      setDocumentFlag(true);
      setAudioFlag(false);
      setImageFlag(false);
      setVideoFlag(false);
    }
    setMedia(e.target.files[0]);
  }

  const queryClient = useQueryClient();
  const otherUserId = userForMessage._id;

  const userId = queryClient.getQueryData('currUser')?._id;
  const chatRoomId = queryClient.getQueryData(['chatRoom', otherUserId])?._id;

  const onSendBtnClick = () => {
    if (media) {
      // console.log(media);

      socket.emit('file-send', {
        file: media,
        filename: media.name,
        type: type,
        userId,
        chatRoomId
      })

      onAddMediaClose()
      
      queryClient.invalidateQueries(['chats', chatRoomId])
    }
  }


  return (
    <div className={styles.addMediaDiv}>
      <div className={styles.addMediaHeader}>
        <p className={styles.addMediaHeaderText}>Add Media</p>
        <input type="file" onChange={onMediaInput} className={styles.addMediaUploadBtn} accept="image/*,video/*" />
        <p className={styles.addMediaHeaderClose}><SquareX onClick={onAddMediaClose} /></p>
      </div>
      <div className={styles.addMediaShowArea}>
        <div className={styles.addMediaShowDiv}>
          {imageFlag && <img src={mediaPreview} alt="image" />}
          {videoFlag && <video ref={videoRef} autoPlay muted controls loop>
            <source src={mediaPreview} type="video/mp4" />
            <source src={mediaPreview} type="video/ogg" />
            Your browser does not support the video tag.
          </video>}
          {audioFlag && <audio controls>
            <source src={mediaPreview} type="audio/ogg" />
            <source src={mediaPreview} type="audio/mpeg" />
          </audio>}
        </div>
      </div>
      <div className={styles.addMediaSendBtnDiv}>
        <button onClick={onSendBtnClick} className={styles.addMediaSendBtn}>Send</button>
      </div>
    </div>
  )
}

export default AddMedia