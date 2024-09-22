import React, { useRef } from 'react'
import showPassword from '../assets/showPassword.png';
import styles from './css modules/RegisterLoginForm.module.css'
import GoogleFacebookLogin from './GoogleFacebookLogin'


function RegisterForm({toLoginFunc}) {

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
            <form className={styles.registerForm}>
                <h2>Register to ChatSync</h2>
                <div className={styles.registerFormInputDiv}>
                    <input className={styles.registerFormTextInput} type="text" placeholder="Name" />
                    {/* <p className={styles.registerFormInputError}>* Name is required</p> */}
                </div>
                <div className={styles.registerFormInputDiv}>
                    <input className={styles.registerFormTextInput} type="email" placeholder="Email" />
                    {/* <p className={styles.registerFormInputError}>* Email is required</p> */}
                </div>
                <div className={styles.registerFormInputDiv}>
                    <input ref={passwordInputRef} className={styles.registerFormPasswordInput} type="password" placeholder="Password" />
                    {/* <p className={styles.registerFormInputError}>* Password is required</p> */}
                    <div className={styles.registerFormShowPasswordDiv}>
                        <img onClick={onShowPasswordClick} className={styles.registerFormShowPassword} src={showPassword} alt="showPassword" />
                    </div>
                </div>
                <div className={styles.registerFormInputDiv}>
                    <input ref={confirmPasswordInputRef} className={styles.registerFormPasswordInput} type="password" placeholder="Confirm Password" />
                    {/* <p className={styles.registerFormInputError}>* Confirm Password should be same as Password</p> */}
                    <div className={styles.registerFormShowPasswordDiv}>
                        <img onClick={onShowConfirmPasswordClick} className={styles.registerFormShowPassword} src={showPassword} alt="showPassword" />
                    </div>
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <span onClick={toLoginFunc} className={styles.registerFormLoginLink}>Login</span></p>
            </form>
            <GoogleFacebookLogin />
        </div>
    )
}

export default RegisterForm