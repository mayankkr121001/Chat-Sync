import React, { useRef } from 'react'
import showPassword from '../assets/showPassword.png';
import styles from './css modules/RegisterLoginForm.module.css'
import GoogleFacebookLogin from './GoogleFacebookLogin'


function LoginForm({toRegisterFunc}) {

    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const onShowPasswordClick = () => {
        passwordInputRef.current.type = passwordInputRef.current.type === "password" ? "text" : "password";
    }
    const onShowConfirmPasswordClick = () => {
        confirmPasswordInputRef.current.type = confirmPasswordInputRef.current.type === "password" ? "text" : "password";
    }
     
    

    return (
        <div>
        <form className={styles.loginForm}>
            <h2>Login to ChatSync</h2>
            <div className={styles.loginFormInputDiv}>
                <input className={styles.loginFormTextInput} type="email" placeholder="Email" />
                {/* <p className={styles.loginFormInputError}>* Email is required</p> */}
            </div>
            <div className={styles.loginFormInputDiv}>
                <input ref={passwordInputRef} className={styles.loginFormPasswordInput} type="password" placeholder="Password" />
                {/* <p className={styles.loginFormInputError}>* Password is required</p> */}
                <div className={styles.loginFormShowPasswordDiv}>
                    <img onClick={onShowPasswordClick} className={styles.loginFormShowPassword} src={showPassword} alt="showPassword" />
                </div>
            </div>
            <div className={styles.loginFormInputDiv}>
                <input ref={confirmPasswordInputRef} className={styles.loginFormPasswordInput} type="password" placeholder="Confirm Password" />
                {/* <p className={styles.loginFormInputError}>* Confirm Password should be same as Password</p> */}
                <div className={styles.loginFormShowPasswordDiv}>
                    <img onClick={onShowConfirmPasswordClick} className={styles.loginFormShowPassword} src={showPassword} alt="showPassword" />
                </div>
            </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <span onClick={toRegisterFunc} className={styles.loginFormRegisterLink}>Register</span></p>
            </form>
            <GoogleFacebookLogin />
        </div>
    )

}

export default LoginForm