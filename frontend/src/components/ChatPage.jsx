import React, { useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'
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
    const [chatListOpen, setChatListOpen] = useState(true)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [changeProfilePicOpen, setChangeProfilePicOpen] = useState(false)
    const [newChatOpen, setNewChatOpen] = useState(false)

    const [messageSectionOpen, setMessageSectionOpen] = useState(true)
    const [addStoryOpen, setAddStoryOpen] = useState(false)
    const [addMediaOpen, setAddMediaOpen] = useState(false)

    const [mobileView, setMobileView] = useState(false)


    useEffect(() => {
        if (window.innerWidth < 750) {
            setMobileView(true)
        }
    }, [])

    const onSettingsClickFunc = () => {
        setChatListOpen(!chatListOpen)
        setSettingsOpen(!settingsOpen)
    }

    const onProfileClickFunc = () => {
        setSettingsOpen(!settingsOpen)
        setProfileOpen(!profileOpen)
    }

    const onChangeProfilePicClickFunc = () => {
        setProfileOpen(!profileOpen)
        setChangeProfilePicOpen(!changeProfilePicOpen)
    }

    const onNewChatClickFunc = () => {
        setChatListOpen(!chatListOpen)
        setNewChatOpen(!newChatOpen)
    }

    const onAddStoryClickFunc = () => {
        if (window.innerWidth < 750) {
            setChatListOpen(!chatListOpen)
        } else {
            setMessageSectionOpen(!messageSectionOpen)
        }
        setAddStoryOpen(!addStoryOpen)
    }

    const onAddMediaClickFunc = () => {
        if (window.innerWidth < 750) {
            setChatListOpen(!chatListOpen)
        } else {
            setMessageSectionOpen(!messageSectionOpen)
        }
        setAddMediaOpen(!addMediaOpen)
    }

    return (
        <>
            {!mobileView ?
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
                            <img src={settingsIcon} alt="settings" onClick={onSettingsClickFunc} />
                        </div>
                    </div>
                    <div className={styles.chatSectionsDiv}>
                        <div className={styles.chatSection1Div}>
                            <StorySection onAddStoryClickFunc={onAddStoryClickFunc} />
                            <div>
                                {chatListOpen && <ChatList onNewChatClickFunc={onNewChatClickFunc} />}
                                {settingsOpen && <Settings onSettingsClickFunc={onSettingsClickFunc} onProfileClickFunc={onProfileClickFunc} />}
                                {profileOpen && <Profile onProfileClickFunc={onProfileClickFunc} onChangeProfilePicClickFunc={onChangeProfilePicClickFunc} />}
                                {changeProfilePicOpen && <ChangeProfilePic onChangeProfilePicClickFunc={onChangeProfilePicClickFunc} />}
                                {newChatOpen && <NewChat onNewChatClickFunc={onNewChatClickFunc} />}
                            </div>
                        </div>
                        <div className={styles.chatSection2Div}>
                            {messageSectionOpen && <MessageSection onAddMediaClickFunc={onAddMediaClickFunc} />}
                            {/* <ImageStoryShow /> */}
                            {addStoryOpen && <AddStory onAddStoryClickFunc={onAddStoryClickFunc} />}
                            {addMediaOpen && <AddMedia onAddMediaClickFunc={onAddMediaClickFunc} />}
                        </div>

                    </div>
                </div> :
                <div className={styles.chatMobileContainer}>
                    <div className={styles.chatMobileTopBar}>
                        <div className={styles.chatMobileProfileDiv}>
                            <div className={styles.chatProfileDotsDiv}>
                                <span className={styles.chatProfileDot}></span>
                                <span className={styles.chatProfileDot}></span>
                                <span className={styles.chatProfileDot}></span>
                            </div>
                            <div className={styles.chatMobileProfileImageDiv}>
                                <img src={defaultProfileImage} alt="profile" />
                            </div>
                        </div>
                        <div className={styles.chatMobileSettingsDiv}>
                            <img src={settingsIcon} alt="settings" onClick={onSettingsClickFunc} />
                        </div>
                    </div>
                    <div className={styles.chatMobileSectionDiv}>
                        <div className={styles.chatMobileStorySectionDiv}>
                            <StorySection onAddStoryClickFunc={onAddStoryClickFunc} />
                        </div>
                        <div className={styles.chatMobileSectionsComponents}>
                            {chatListOpen && <ChatList onNewChatClickFunc={onNewChatClickFunc} />}
                            {settingsOpen && <Settings onSettingsClickFunc={onSettingsClickFunc} onProfileClickFunc={onProfileClickFunc} />}
                            {profileOpen && <Profile onProfileClickFunc={onProfileClickFunc} onChangeProfilePicClickFunc={onChangeProfilePicClickFunc} />}
                            {changeProfilePicOpen && <ChangeProfilePic onChangeProfilePicClickFunc={onChangeProfilePicClickFunc} />}
                            {newChatOpen && <NewChat onNewChatClickFunc={onNewChatClickFunc} />}
                            {addStoryOpen && <AddStory onAddStoryClickFunc={onAddStoryClickFunc} />}
                        </div>

                    </div>
                </div>}
        </>
    )
}

export default ChatPage