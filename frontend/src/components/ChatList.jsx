import React, {useRef} from 'react'
import styles from './css modules/ChatList.module.css'
import api from '../interceptors/axios.js'
import { useQuery } from 'react-query'
import addContactIcon from '../assets/addContact.png'
import profilePic from '../assets/profile.png'

function ChatList({ onNewChatClickFunc, onMessageSectionOpen }) {

    const connectedUsersRef = useRef([]);

    const { error, data: connectedUsers } = useQuery({
        queryKey: ["connectedUsers"],
        queryFn: async () => {
            const res = await api.get('/chatRoom/connectedUsers');
            // console.log(res.data.otherConnectedUsers);
            return res.data.otherConnectedUsers;
        },
        onSuccess: (data)=>{
            for(let i =0; i<= data?.length - 1 ; i++){
                connectedUsersRef.current[i]?.classList.remove(styles.chatListOpenUser)
            }
        }
    })
    if (error) {
        console.log(error);
    }
    
    const onConnectedUserClick = (user, index)=>{
        
        for(let i =0; i<= connectedUsers.length - 1 ; i++){
            connectedUsersRef.current[i].classList.remove(styles.chatListOpenUser)
        }

        connectedUsersRef.current[index].classList.add(styles.chatListOpenUser)

        onMessageSectionOpen(user)
    }


    return (
        <div className={styles.chatListContainer}>
            <div className={styles.chatListHeader}>
                <div className={styles.chatListHeaderText}>Chats</div>
                <div className={styles.chatListAddIcons}>
                    <img src={addContactIcon} alt="contact" onClick={onNewChatClickFunc} />
                </div>
            </div>
            <div className={styles.chatListSearchDiv}>
                <input type="text" placeholder='Search' />
            </div>
            <div className={styles.chatListsDiv}>
                {connectedUsers?.map((user, index) => (
                    <div key={index} onClick={() => onConnectedUserClick(user, index)} className={styles.chatList}>
                        <div ref={el => connectedUsersRef.current[index]= el} className={styles.chatListContent}>
                            <div className={styles.chatListProfilePic}>
                                {user?.profileImage ? <img src={user.profileImage} alt="profile" />:<img src={profilePic} alt="profile" />}
                            </div>
                            <div className={styles.chatListProfileText}>
                                <div className={styles.chatListProfileName}>{user.name}</div>
                                {/* <div className={styles.chatListProfileMessage}>Hello, how are you today?</div> */}
                            </div>
                        </div>
                        <div className={styles.chatListBottomLine}></div>
                    </div>
                ))}
                {/* <div className={styles.chatList}>
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
                </div> */}


            </div>
        </div>
    )
}

export default ChatList