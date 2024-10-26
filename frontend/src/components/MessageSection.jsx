import React, { useState, useRef, useEffect } from 'react'
import styles from './css modules/MessageSection.module.css'
import api from '../interceptors/axios.js';
import { useQuery, useQueryClient } from 'react-query';
import EmojiPicker from 'emoji-picker-react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Trash2, SquareX } from 'lucide-react';
import profilePic from '../assets/profile.png'
import microphone from '../assets/mic.png'
import send from '../assets/send.png'
import attachIcon from '../assets/attach.png'
import emojiIcon from '../assets/emojiIcon.png'
import MessageReceived from './MessageReceived.jsx'
import MessageSend from './MessageSend.jsx'
import { socket } from '../socket/socket.js';
import { Riple } from "react-loading-indicators"


function MessageSection({ userForMessage, onMessageSectionClose, onAddMediaClickFunc }) {
  const [textInput, setTextInput] = useState('');
  const [media, setMedia] = useState('')
  const [audio, setAudio] = useState('');
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const lastMessageRef = useRef(null)

  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      const { message, senderId, chatRoomId } = data;
      // console.log(message);

      queryClient.invalidateQueries(['chats', chatRoomId])

    })
    socket.on('file-receive', (data) => {
      const { message, senderId, chatRoomId } = data;
      // console.log(message);

      queryClient.invalidateQueries(['chats', chatRoomId])

    })
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  })



  const textInputRef = useRef(null);
  const onTextInputChange = (e) => {
    setTextInput(e.target.value);
  }
  const onTextInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      textInputRef.current.setAttribute('rows', parseInt(textInputRef.current.getAttribute('rows')) + 1);
    }
    else if (e.key === 'Backspace' && (e.target.selectionStart === 0 || e.target.value[e.target.selectionStart - 1] === '\n')) {
      if (textInputRef.current.getAttribute('rows') > 1) {
        textInputRef.current.setAttribute('rows', parseInt(textInputRef.current.getAttribute('rows')) - 1);
      }
    }
  }

  const addAudioElement = (audio) => {
    const audioUrl = URL.createObjectURL(audio);
    // console.log(audio);
    setMedia(audio);
    // console.log(audioUrl);
    setAudio(audioUrl)
    setRecordingComplete(true);
  }

  const onEmojiIconClick = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  }
  const onEmojiClick = (emojiData) => {
    // console.log(emojiData.emoji);
    setTextInput((prev) => prev + emojiData.emoji);
  }

  // GET CHAT ROOM
  const otherUserId = userForMessage._id;
  // console.log(otherUserId);

  const { data: chatRoom } = useQuery({
    queryKey: ['chatRoom', otherUserId],
    queryFn: async () => {
      const res = await api.get('chatRoom/getRoom', {
        params: { otherUserId }
      })
      // console.log(res.data.chatRoom[0]._id);
      return res.data.chatRoom[0]
    }
  })

  const chatRoomId = chatRoom?._id;

  const { isLoading, data: chats } = useQuery({
    queryKey: ['chats', chatRoomId],
    queryFn: async () => {
      const res = await api.get('/message/getChats', {
        params: { chatRoomId: chatRoomId }
      })
      // console.log(res.data.messagesReceived);
      return res.data
    },
    enabled: !!chatRoomId,

  })

  

  const userId = queryClient.getQueryData('currUser')._id;

  const OnSendBtnClick = () => {
    if (media) {
      // console.log(media);
      socket.emit('file-send', {
        file: media,
        filename: media.name,
        type: "audio",
        userId,
        chatRoomId
      })

      onAudioDeleteBtnClick();
    }
    else {
      socket.emit('sendMessage', { textInput, type: "text", userId, chatRoomId });
    }

    queryClient.invalidateQueries(['chats', chatRoomId])

    setEmojiPickerOpen(false)
    setTextInput('');
  }

  const onAudioDeleteBtnClick = () => {
    setRecordingComplete(false)
    setMedia('')
    setAudio('')
  }




  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageHeader}>
        <div className={styles.messageHeaderUserInfo}>
          <div className={styles.messageHeaderProfilePic}>
            {userForMessage?.profileImage ? <img src={userForMessage?.profileImage} alt="profile" /> : <img src={profilePic} alt="profile" />}
          </div>
          <div className={styles.messageHeaderProfileText}>
            <div className={styles.messageHeaderProfileName}>{userForMessage?.name}</div>
            {/* <div className={styles.messageHeaderProfileStatus}>Online</div> */}
          </div>
        </div>
        <p className={styles.messageSectonCloseBtn}><SquareX onClick={onMessageSectionClose} /></p>
      </div>
      <div className={styles.messagesDiv}>
        {isLoading && <div style={{ textAlign: 'center', marginTop: '20px  ' }}>
          <Riple color="white" size="small" text="" textColor="#ffd7d7" />
        </div>}


        {chats?.allChats && chats.allChats.map((msg, index) => (
          <div key={index} ref={index === chats.allChats.length - 1 ? lastMessageRef : null}>
            {(msg.sender !== userId) && <MessageReceived content={msg.content} type={msg.type} time={msg.createdAt} />}
            {(msg.sender === userId) && <MessageSend content={msg.content} type={msg.type} time={msg.createdAt} />}
          </div>
        ))}


      </div>
      {emojiPickerOpen && <div className={styles.messageEmojiPickerDiv}>
        <EmojiPicker onEmojiClick={onEmojiClick} />
      </div>}
      <div className={styles.messageSendFooter}>
        <div className={styles.messageSendBox}>
          <div className={styles.messageSendBoxMicrophone}>
            {/* <img src={microphone} alt="microphone" /> */}
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              showVisualizer={true}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
            />
          </div>

          {(recordingComplete === false) && <div className={styles.messageSendBoxInputDiv}>
            <textarea ref={textInputRef} rows={1} onChange={onTextInputChange} onKeyDown={onTextInputKeyDown} type="text" placeholder='Type Something...' value={textInput} />
          </div>}
          {(recordingComplete) && <div className={styles.messageSendBoxAudio}>
            <audio src={audio} controls />
            <span >
              <Trash2 onClick={onAudioDeleteBtnClick} size={20} />
            </span>
          </div>}
          <div className={styles.messageSendOptions}>
            <img src={emojiIcon} alt="emoji" onClick={onEmojiIconClick} />
            <img src={attachIcon} alt="attach" onClick={onAddMediaClickFunc} />

            <img onClick={OnSendBtnClick} src={send} alt="send" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageSection