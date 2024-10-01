import React from 'react'
import styles from './css modules/ChatPage.module.css'
import defaultProfileImage from '../assets/profile.png'
import settingsIcon from '../assets/settings.png'
import StorySection from './StorySection.jsx'
import ChatList from './ChatList.jsx'
import MessageSection from './MessageSection.jsx'
import Settings from './Settings.jsx'
import Profile from './Profile.jsx'
import ChangeProfilePic from './ChangeProfilePic.jsx'
import NewChat from './NewChat.jsx'
import ImageStoryShow from './ImageStoryShow.jsx'
import AddStory from './AddStory.jsx'
import AddMedia from './AddMedia.jsx'

function ChatPage() {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatSidebarDiv}>
                <div className={styles.chatProfile}>
                    <div className={styles.chatProfileDotsDiv}>
                        <span className={styles.chatProfileDot}></span>
                        <span className={styles.chatProfileDot}></span>
                        <span className={styles.chatProfileDot}></span>
                    </div>
                    <div className={styles.chatProfileImageDiv}>
                        <img src={defaultProfileImage} alt="profile" />
                    </div>
                </div>
                <div className={styles.chatSettingsDiv}>
                    <img src={settingsIcon} alt="settings" />
                </div>
            </div>
            <div className={styles.chatSectionsDiv}>
                <div className={styles.chatSection1Div}>
                    <StorySection />
                    <div>
                        <ChatList />    
                        {/* <Settings /> */}
                        {/* <Profile /> */}
                        {/* <ChangeProfilePic /> */}
                        {/* <NewChat /> */}
                    </div>
                </div>
                <div className={styles.chatSection2Div}>
                    <MessageSection />
                    {/* <ImageStoryShow /> */}
                    {/* <AddStory /> */}
                    {/* <AddMedia /> */}
                </div>

            </div>
        </div>
    )
}

export default ChatPage