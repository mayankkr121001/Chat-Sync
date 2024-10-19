import React, { useState, useEffect, useRef } from 'react'
import { useQueryClient, useQuery } from 'react-query'
import api from '../interceptors/axios.js'
import {socket} from '../socket/socket.js'
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
import { User } from 'lucide-react'

function ChatPage() {
    const [chatListOpen, setChatListOpen] = useState(true)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [changeProfilePicOpen, setChangeProfilePicOpen] = useState(false)
    const [newChatOpen, setNewChatOpen] = useState(false)

    const [messageSectionOpen, setMessageSectionOpen] = useState(true)
    const [addStoryOpen, setAddStoryOpen] = useState(false)
    const [addMediaOpen, setAddMediaOpen] = useState(false)
    const [showStoryMediaOpen, setShowStoryMediaOpen] = useState(false)

    const [mobileView, setMobileView] = useState(false)

    const queryClient = useQueryClient();

    const storyDivRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 750) {
            setMobileView(true)
        }
    }, [])

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected", socket.id);
        })
        console.log(socket);

        // socket.emit("message", "Checking message");

        // socket.on("info", (inf)=>{
        //     console.log(inf);
        // })

        // socket.on('disconnect', ()=>{
        //     console.log("Disconnected", socket.id)
        // })

        return ()=>{
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [])


    useEffect(() => {

        if (user?.story && user?.storySeen === false) {
            storyDivRef.current.classList.remove(styles.profileStorySeen)
            storyDivRef.current.classList.add(styles.profileStoryNotSeen)
        }
        else if (user?.story && user?.storySeen === true) {
            storyDivRef.current.classList.remove(styles.profileStoryNotSeen)
            storyDivRef.current.classList.add(styles.profileStorySeen)
        }

        const checkStoryExpiry = () => {
            const createdAt = new Date(user?.storyCreatedTime);
            const now = new Date();
            const expiryDuration = 24 * 60 * 60 * 1000;

            if (now - createdAt > expiryDuration) {
                storyDivRef.current.classList.remove(styles.profileStoryNotSeen)
                storyDivRef.current.classList.remove(styles.profileStorySeen)

                onImgStoryClose();
            }
        };

        checkStoryExpiry();

        const interval = setInterval(checkStoryExpiry, 1 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    });

    const { error, data: user } = useQuery({
        queryKey: ['currUser'],
        queryFn: async () => {
            const res = await api.get('/user/authUser');
            //  console.log(res.data);
            return res.data.user;

        },
        refetchInterval: 24 * 60 * 60 * 1000
    })
    // console.log(user);
    if (error) {
        console.log(error);
    }



    const onSettingsClickFunc = () => {
        setChatListOpen(false)
        setNewChatOpen(false)
        if (window.innerWidth < 750) {
            setAddMediaOpen(false)
            setShowStoryMediaOpen(false)
            setAddStoryOpen(false)
        }
        setSettingsOpen(true)
    }

    const onSettingsClose = () => {
        setChatListOpen(true)
        setSettingsOpen(false)
    }

    const onProfileClickFunc = () => {
        setSettingsOpen(false)
        setProfileOpen(true)
    }
    const onProfileClose = () => {
        setSettingsOpen(true)
        setProfileOpen(false)
    }

    const onChangeProfilePicClickFunc = () => {
        setProfileOpen(false)
        setChangeProfilePicOpen(true)
    }
    const onChangeProfilePicClose = () => {
        setProfileOpen(true)
        setChangeProfilePicOpen(false)
    }

    const onNewChatClickFunc = () => {
        setChatListOpen(false)
        setNewChatOpen(true)
    }
    const onNewChatClose = () => {
        setChatListOpen(true)
        setNewChatOpen(false)
    }


    const onAddStoryClickFunc = () => {
        if (window.innerWidth < 750) {
            setChatListOpen(false)
            setSettingsOpen(false)
            setProfileOpen(false)
            setChangeProfilePicOpen(false)
            setNewChatOpen(false)
            setMessageSectionOpen(false)
            setAddMediaOpen(false)
            setShowStoryMediaOpen(false)
        } else {
            setMessageSectionOpen(false)
            setAddMediaOpen(false)
            setShowStoryMediaOpen(false)
        }
        setAddStoryOpen(true)
    }

    const onAddStoryClose = () => {
        if (window.innerWidth < 750) {
            setChatListOpen(true)
        } else {
            setMessageSectionOpen(true)
        }
        setAddStoryOpen(false)
    }

    const onAddMediaClickFunc = () => {
        if (window.innerWidth < 750) {
            setChatListOpen(false)
            setSettingsOpen(false)
            setProfileOpen(false)
            setChangeProfilePicOpen(false)
            setNewChatOpen(false)
            setMessageSectionOpen(false)
            setAddStoryOpen(false)
            setShowStoryMediaOpen(false)
        } else {
            setMessageSectionOpen(false)
            setAddStoryOpen(false)
            setShowStoryMediaOpen(false)
        }
        setAddMediaOpen(!addMediaOpen)
    }

    const onAddMediaClose = () => {
        if (window.innerWidth < 750) {
            setMessageSectionOpen(true)
        } else {
            setMessageSectionOpen(true)
        }
        setAddMediaOpen(false)
    }

    const onMessageSectionOpen = (user) => {
        if (window.innerWidth < 750) {
            setChatListOpen(false)
            setSettingsOpen(false)
            setProfileOpen(false)
            setChangeProfilePicOpen(false)
            setNewChatOpen(false)
            setAddStoryOpen(false)
            setAddMediaOpen(false)
            setShowStoryMediaOpen(false)
        } else {
            setAddStoryOpen(false)
            setAddMediaOpen(false)
            setShowStoryMediaOpen(false)
        }
        setMessageSectionOpen(true)

        setUserForMessage(user)
    }
    const onMessageSectionClose = () => {
        if (window.innerWidth < 750) {
            setChatListOpen(true)
        }
        setMessageSectionOpen(false)
    }


    const [userForStory, setUserForStory] = useState();
    const [userForMessage, setUserForMessage] = useState();

    const onImgStoryClick = (user) => {
        if (user?.story) {
            if (window.innerWidth < 750) {
                setChatListOpen(false)
                setSettingsOpen(false)
                setProfileOpen(false)
                setChangeProfilePicOpen(false)
                setNewChatOpen(false)
                setMessageSectionOpen(false)
                setAddStoryOpen(false)
                setAddMediaOpen(false)
            } else {
                setMessageSectionOpen(false)
                setAddStoryOpen(false)
                setAddMediaOpen(false)
            }
            setShowStoryMediaOpen(true)

            setUserForStory(user)

            api.put('/user/storySeen')
                .then(res => {
                    // console.log(res);
                    queryClient.invalidateQueries('currUser');
                })
                .catch(err => {
                    console.log(err);

                })

        }
    }

    const onImgStoryClose = () => {
        if (window.innerWidth < 750) {
            setChatListOpen(true)
        } else {
            setMessageSectionOpen(true)
        }
        setShowStoryMediaOpen(false)
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
                            <div ref={storyDivRef} className={`${styles.chatProfileImageDiv}`}>
                                {user?.profileImage ? <img onClick={() => onImgStoryClick(user)} src={user.profileImage} alt="profile" />
                                    : <img onClick={() => onImgStoryClick(user)} src={defaultProfileImage} alt="profile" />}
                            </div>
                        </div>
                        <div className={styles.chatSettingsDiv}>
                            <img src={settingsIcon} alt="settings" onClick={onSettingsClickFunc} />
                        </div>
                    </div>
                    <div className={styles.chatSectionsDiv}>
                        <div className={styles.chatSection1Div}>
                            <StorySection onAddStoryClickFunc={onAddStoryClickFunc} onImgStoryClick={onImgStoryClick} />
                            <div>
                                {chatListOpen && <ChatList onNewChatClickFunc={onNewChatClickFunc} />}
                                {settingsOpen && <Settings onSettingsClose={onSettingsClose} onProfileClickFunc={onProfileClickFunc} />}
                                {profileOpen && <Profile onProfileClose={onProfileClose} onChangeProfilePicClickFunc={onChangeProfilePicClickFunc} />}
                                {changeProfilePicOpen && <ChangeProfilePic onChangeProfilePicClose={onChangeProfilePicClose} />}
                                {newChatOpen && <NewChat onNewChatClose={onNewChatClose} onMessageSectionOpen={onMessageSectionOpen} />}
                            </div>
                        </div>
                        <div className={styles.chatSection2Div}>
                            {messageSectionOpen && <MessageSection userForMessage={userForMessage} onMessageSectionClose={onMessageSectionClose} onAddMediaClickFunc={onAddMediaClickFunc} />}
                            {showStoryMediaOpen && <ImageStoryShow user={userForStory} onImgStoryClose={onImgStoryClose} />}
                            {addStoryOpen && <AddStory onAddStoryClose={onAddStoryClose} />}
                            {addMediaOpen && <AddMedia onAddMediaClose={onAddMediaClose} />}
                        </div>

                    </div>
                </div> : <>
                    {(!messageSectionOpen && !addMediaOpen) ? <div className={styles.chatMobileContainer}>
                        <div className={styles.chatMobileTopBar}>
                            <div className={styles.chatMobileProfileDiv}>
                                <div className={styles.chatProfileDotsDiv}>
                                    <span className={styles.chatProfileDot}></span>
                                    <span className={styles.chatProfileDot}></span>
                                    <span className={styles.chatProfileDot}></span>
                                </div>
                                <div ref={storyDivRef} className={styles.chatMobileProfileImageDiv}>
                                    {user?.profileImage ? <img onClick={() => onImgStoryClick(user)} src={user.profileImage} alt="profile" />
                                        : <img onClick={() => onImgStoryClick(user)} src={defaultProfileImage} alt="profile" />}
                                </div>
                            </div>
                            <div className={styles.chatMobileSettingsDiv}>
                                <img src={settingsIcon} alt="settings" onClick={onSettingsClickFunc} />
                            </div>
                        </div>
                        <div className={styles.chatMobileSectionDiv}>
                            <div className={styles.chatMobileStorySectionDiv}>
                                <StorySection onAddStoryClickFunc={onAddStoryClickFunc} onImgStoryClick={onImgStoryClick} />
                            </div>
                            <div className={styles.chatMobileSectionsComponents}>
                                {chatListOpen && <ChatList onNewChatClickFunc={onNewChatClickFunc} />}
                                {settingsOpen && <Settings onSettingsClickFunc={onSettingsClose} onProfileClickFunc={onProfileClickFunc} />}
                                {profileOpen && <Profile onProfileClose={onProfileClose} onChangeProfilePicClickFunc={onChangeProfilePicClickFunc} />}
                                {changeProfilePicOpen && <ChangeProfilePic onChangeProfilePicClose={onChangeProfilePicClose} />}
                                {newChatOpen && <NewChat onNewChatClose={onNewChatClose} onMessageSectionOpen={onMessageSectionOpen} />}
                                {addStoryOpen && <AddStory onAddStoryClose={onAddStoryClose} />}
                                {showStoryMediaOpen && <ImageStoryShow user={userForStory} onImgStoryClose={onImgStoryClose} />}
                            </div>
                        </div>
                    </div> :
                        <>
                            {!addMediaOpen ? <div className={styles.chatMobileContainer}>
                                <MessageSection userForMessage={userForMessage} onMessageSectionClose={onMessageSectionClose} onAddMediaClickFunc={onAddMediaClickFunc} />
                            </div> :
                                <div className={styles.chatMobileContainer}>
                                    <AddMedia onAddMediaClose={onAddMediaClose} />
                                </div>}
                        </>
                    }
                </>}
        </>
    )
}

export default ChatPage