import React, {useRef} from 'react'
import styles from './css modules/storySection.module.css'
import addStory from '../assets/addStory.png'
import api from '../interceptors/axios.js'
import { useQuery } from 'react-query'
import profilePic from '../assets/profile.png'

function StorySection({ onAddStoryClickFunc, onImgStoryClick }) {

    const { error, data: usersWithStory } = useQuery({
        queryKey: ['usersWithStory'],
        queryFn: async () => {
            const res = await api.get('/user/usersStories');
            // console.log(res.data.usersWithStories);
            return res.data.usersWithStories
        }
    })
    if(error){
        console.log(error); 
    }

    const onOtherStoryClick = (user)=>{
        // console.log(user);

        onImgStoryClick(user)
    }


    return (
        <div className={styles.storyContainer}>
            <div className={styles.storySectionDiv}>
                <div className={styles.storySectionStories}>
                    <div className={styles.addStoryDiv}>
                        <img src={addStory} alt="addStory" onClick={onAddStoryClickFunc} />
                    </div>
                    <div className={styles.storiesDiv}>
                        {usersWithStory && usersWithStory.map((elem, index) => (
                            <div key={index} className={`${styles.storyDiv}`} onClick={() => onOtherStoryClick(elem)}>
                                {elem.profileImage ? <img  src={elem.profileImage} alt="profilePic" />:
                                <img onClick={() => onOtherStoryClick(elem)} src={profilePic} alt="profilePic" />}
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
            <div className={styles.storySectionLine}></div>
        </div>
    )
}

export default StorySection