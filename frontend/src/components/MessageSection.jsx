import React, { useState, useRef } from 'react'
import styles from './css modules/MessageSection.module.css'
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

function MessageSection({userForMessage, onMessageSectionClose, onAddMediaClickFunc }) {
  const [textInput, setTextInput] = useState('');
  const [audio, setAudio] = useState(null);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

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
    // console.log(url);
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


  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageHeader}>
        <div className={styles.messageHeaderUserInfo}>
          <div className={styles.messageHeaderProfilePic}>
            {userForMessage?.profileImage ? <img src={userForMessage?.profileImage} alt="profile" />: <img src={profilePic} alt="profile" />}
          </div>
          <div className={styles.messageHeaderProfileText}>
            <div className={styles.messageHeaderProfileName}>{userForMessage?.name}</div>
            {/* <div className={styles.messageHeaderProfileStatus}>Online</div> */}
          </div>
        </div>
        <p className={styles.messageSectonCloseBtn}><SquareX onClick={onMessageSectionClose} /></p>
      </div>
      <div className={styles.messagesDiv}>
        <div className={styles.messageReceivedContainer}>
          <MessageReceived text="This is a test message Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque harum facere esse quo iste autem rem obcaecati, expedita labore!" />
          <MessageReceived text="This is a test message Lorem ipsum dolor sit amet consectetur adipisicing elit." />
          <MessageReceived text="This is a test message" />
          <MessageReceived text="This is a test message" />
        </div>
        <div className={styles.messageSendContainer}>
          <MessageSend text="This is a test message Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque harum facere esse quo iste autem rem obcaecati, expedita labore!" />
          <MessageSend text="This is a test message Lorem ipsum dolor sit amet consectetur adipisicing elit." />
          <MessageSend text="This is a test message Lorem ipsum dolor sit amet consectetur adipisicing elit." />
          <MessageSend text="This is a test message" />
        </div>
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
              <Trash2 onClick={() => setRecordingComplete(false)} />
            </span>
          </div>}
          <div className={styles.messageSendOptions}>
            <img src={emojiIcon} alt="emoji" onClick={onEmojiIconClick} />
            <img src={attachIcon} alt="attach" onClick={onAddMediaClickFunc} />

            <img src={send} alt="send" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageSection