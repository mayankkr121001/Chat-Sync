import React, { useState } from 'react'
import styles from './css modules/NewChat.module.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import api from '../interceptors/axios.js'
import {socket} from '../socket/socket.js'
import profile from '../assets/profile.png'
import { SquareX } from 'lucide-react'
import { Riple } from "react-loading-indicators"

function NewChat({ onNewChatClose, onMessageSectionOpen }) {
    const [inputSearch, setInputSearch] = useState("");
    const [filterdArray, setFilterdArray] = useState([]);

    const queryClient = useQueryClient();

    const { isLoading, error, data: allUsers } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await api.get('/user/getAllUsers');
            return res.data.allUsers;
        },
        staleTime: 5000
    })
    if (error) {
        console.log(error);

    }

    const onChatSearch = (e) => {
        setInputSearch(e.target.value)

        const filterdUser = allUsers.filter((elem, index) => elem.name.includes(inputSearch));
        // console.log(filterdUser);
        setFilterdArray(filterdUser)
        if (e.target.value === "") {
            setFilterdArray([])
        }
    }

    const chatRoomMutation = useMutation({
        mutationFn: async (newData) => {
            return api.post('/chatRoom/createRoom', newData)
                
        },
        onSuccess: (data) => {
            // console.log(data);
            queryClient.invalidateQueries("connectedUsers")
            
        }
    })


    const onSearchedUserClick = (elem) => {
        onMessageSectionOpen(elem);
        const otherUserId = elem._id;

        chatRoomMutation.mutate({otherUserId})

    }

    return (
        <div className={styles.newChatDiv}>
            <div className={styles.newChatHeader}>
                <p className={styles.newChatHeaderText}>New Chat</p>
                <p className={styles.newChatHeaderClose}><SquareX onClick={onNewChatClose} /></p>
            </div>
            <div className={styles.newChatSearchInputDiv}>
                <input type="text" onChange={onChatSearch} placeholder="Search" className={styles.newChatSearchInput} value={inputSearch} />
            </div>
            <div className={styles.newChatSearchedAccountsDiv}>
                {isLoading && <div style={{ textAlign: 'center' }}><Riple color="#ffffff" size="small" text="" textColor="#ffd7d7" /></div>}
                {filterdArray && filterdArray.map((elem, index) => (
                    <div onClick={() => onSearchedUserClick(elem)} key={index} className={styles.newChatSearchedAccount}>
                        <img src={elem.profileImage ? `${elem.profileImage}` : `${profile}`} alt="profile" />
                        <p className={styles.newChatSearchedAccountName}>{elem.name}</p>
                    </div>
                ))}
                {/* <div className={styles.newChatSearchedAccount}>
                    <img src={profile} alt="profile" />
                    <p className={styles.newChatSearchedAccountName}>Avinandan Bhandari</p>
                </div> */}
            </div>
        </div>
    )
}

export default NewChat