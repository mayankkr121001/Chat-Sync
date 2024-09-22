import React, { useState, useEffect } from 'react'
import styles from './css modules/HomePage.module.css'
import homeImage from "../assets/chatVector3.png"
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

function HomePage() {
    const [loginFormVisible, setLoginFormVisible] = useState(false);
    const [registerFormVisible, setRegisterFormVisible] = useState(true);

    const onHomeSectionLoginBtnClick = () => {
        setLoginFormVisible(true);
        setRegisterFormVisible(false);
    }

    const onHomeSectionRegisterBtnClick = () => {
        setLoginFormVisible(false);
        setRegisterFormVisible(true);
    }   

    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.homeSectionContainer}>
                    <div className={styles.homeSectionFormDiv}>
                        <div className={styles.homeSectionFormNameLoginDiv}>
                            <h1 className={styles.homeSectionFormName}>ChatSync</h1>
                            {registerFormVisible && <button onClick={onHomeSectionLoginBtnClick} className={styles.homeSectionLoginBtn}>Login</button>}
                            {loginFormVisible && <button onClick={onHomeSectionRegisterBtnClick} className={styles.homeSectionRegisterBtn}>Register</button>}
                        </div>
                        {registerFormVisible && <RegisterForm toLoginFunc={onHomeSectionLoginBtnClick}/>}
                        {loginFormVisible &&    <LoginForm toRegisterFunc={onHomeSectionRegisterBtnClick}/>}
                    </div>
                    <div className={styles.homeSectionOptionsImageDiv}>
                        <div className={styles.homeSectionOptionsDiv}>
                            <button onClick={onHomeSectionLoginBtnClick} className={styles.homeSectionOptionsLoginBtn}>Login</button>
                            <button onClick={onHomeSectionRegisterBtnClick} className={styles.homeSectionOptionsRegisterBtn}>Register</button>
                        </div>
                        <div className={styles.homeSectionImageDiv}>
                            <img src={homeImage} alt="Home" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomePage