import React, { useState } from 'react'
import styles from './css modules/MessageSection.module.css'
import EmojiPicker from 'emoji-picker-react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Trash2 } from 'lucide-react';
import profilePic from '../assets/profile.png'
import microphone from '../assets/mic.png'
import send from '../assets/send.png'
import attachIcon from '../assets/attach.png'
import emojiIcon from '../assets/emojiIcon.png'
import MessageReceived from './MessageReceived.jsx'
import MessageSend from './MessageSend.jsx'

function MessageSection() {
  const [textInput, setTextInput] = useState('');
  const [audio, setAudio] = useState(null);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [recordingDeleted, setRecordingDeleted] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);


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
        <div className={styles.messageHeaderProfilePic}>
          <img src={profilePic} alt="profile" />
        </div>
        <div className={styles.messageHeaderProfileText}>
          <div className={styles.messageHeaderProfileName}>Mayank kumar</div>
          <div className={styles.messageHeaderProfileStatus}>Online</div>
        </div>

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
        <EmojiPicker onEmojiClick={onEmojiClick}/>
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
          
          {(recordingComplete === false ) && <div className={styles.messageSendBoxInputDiv}>
            <input onChange={e => setTextInput(e.target.value)} type="text" placeholder='Type Something...' value={textInput}/>
          </div>}
          {(recordingComplete) && <div className={styles.messageSendBoxAudio}>
            <audio src={audio} controls />
            <span >
              <Trash2 onClick={() => setRecordingComplete(false)}/>
            </span>
          </div>}
          <div className={styles.messageSendOptions}>
            <img src={emojiIcon} alt="emoji" onClick={onEmojiIconClick}/>
            <img src={attachIcon} alt="attach" />
            
            <img src={send} alt="send" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageSection