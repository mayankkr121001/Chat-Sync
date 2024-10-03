import React from 'react'
import styles from './css modules/storySection.module.css'
import addStory from '../assets/addStory.png'
import profilePic from '../assets/profile.png'

function StorySection({onAddStoryClickFunc}) {
    return (
        <div className={styles.storyContainer}>
            <div className={styles.storySectionDiv}>
                <div className={styles.storySectionStories}>
                    <div className={styles.addStoryDiv}>
                        <img src={addStory} alt="addStory" onClick={onAddStoryClickFunc}/>
                    </div>
                    <div className={styles.storiesDiv}>
                        <div className={styles.storyDiv}>
                            <img src={profilePic} alt="profilePic" />
                        </div>
                        <div className={styles.storyDiv}>
                            <img src={profilePic} alt="profilePic" />
                        </div>
                        <div className={styles.storyDiv}>
                            <img src={profilePic} alt="profilePic" />
                        </div>
                        <div className={styles.storyDiv}>
                            <img src={profilePic} alt="profilePic" />
                        </div>
                        <div className={styles.storyDiv}>
                            <img src={profilePic} alt="profilePic" />
                        </div>
                        <div className={styles.storyDiv}>
                            <img src={profilePic} alt="profilePic" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.storySectionLine}></div>
        </div>
    )
}

export default StorySection