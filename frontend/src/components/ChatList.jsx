import React from 'react'
import styles from './css modules/ChatList.module.css'
import addContactIcon from '../assets/addContact.png'
import profilePic from '../assets/profile.png'

function ChatList({onNewChatClickFunc}) {
    return (
        <div className={styles.chatListContainer}>
            <div className={styles.chatListHeader}>
                <div className={styles.chatListHeaderText}>Chats</div>
                <div className={styles.chatListAddIcons}>
                    <img src={addContactIcon} alt="contact" onClick={onNewChatClickFunc}/>
                </div>
            </div>
            <div className={styles.chatListSearchDiv}>
                <input type="text" placeholder='Search' />
            </div>
            <div className={styles.chatListsDiv}>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Mayank kumar</div>
                            <div className={styles.chatListProfileMessage}>Hello, how are you today?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Shivam (BCA)</div>
                            <div className={styles.chatListProfileMessage}>Ok</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>SAURYA KUMAR</div>
                            <div className={styles.chatListProfileMessage}>kya haal hai ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>High Table</div>
                            <div className={styles.chatListProfileMessage}>koi jaa raha aaj ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Mayank kumar</div>
                            <div className={styles.chatListProfileMessage}>Hello, how are you today?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Shivam (BCA)</div>
                            <div className={styles.chatListProfileMessage}>Ok</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>SAURYA KUMAR</div>
                            <div className={styles.chatListProfileMessage}>kya haal hai ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>High Table</div>
                            <div className={styles.chatListProfileMessage}>koi jaa raha aaj ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Mayank kumar</div>
                            <div className={styles.chatListProfileMessage}>Hello, how are you today?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Shivam (BCA)</div>
                            <div className={styles.chatListProfileMessage}>Ok</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>SAURYA KUMAR</div>
                            <div className={styles.chatListProfileMessage}>kya haal hai ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>High Table</div>
                            <div className={styles.chatListProfileMessage}>koi jaa raha aaj ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Mayank kumar</div>
                            <div className={styles.chatListProfileMessage}>Hello, how are you today?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Shivam (BCA)</div>
                            <div className={styles.chatListProfileMessage}>Ok</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>SAURYA KUMAR</div>
                            <div className={styles.chatListProfileMessage}>kya haal hai ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>High Table</div>
                            <div className={styles.chatListProfileMessage}>koi jaa raha aaj ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Mayank kumar</div>
                            <div className={styles.chatListProfileMessage}>Hello, how are you today?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>Shivam (BCA)</div>
                            <div className={styles.chatListProfileMessage}>Ok</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>SAURYA KUMAR</div>
                            <div className={styles.chatListProfileMessage}>kya haal hai ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                <div className={styles.chatList}>
                    <div className={styles.chatListContent}>
                        <div className={styles.chatListProfilePic}>
                            <img src={profilePic} alt="profile" />
                        </div>
                        <div className={styles.chatListProfileText}>
                            <div className={styles.chatListProfileName}>High Table</div>
                            <div className={styles.chatListProfileMessage}>koi jaa raha aaj ?</div>
                        </div>

                    </div>
                    <div className={styles.chatListBottomLine}></div>
                </div>
                
            </div>
        </div>
    )
}

export default ChatList