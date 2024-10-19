import React, {useState, useRef } from 'react'
import api from '../interceptors/axios.js';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {Riple} from "react-loading-indicators"
import showPassword from '../assets/showPassword.png';
import styles from './css modules/RegisterLoginForm.module.css'


function LoginForm({ toRegisterFunc }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [inputError, setInputError] = useState({});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const onShowPasswordClick = () => {
        passwordInputRef.current.type = passwordInputRef.current.type === "password" ? "text" : "password";
    }
    const onShowConfirmPasswordClick = () => {
        confirmPasswordInputRef.current.type = confirmPasswordInputRef.current.type === "password" ? "text" : "password";
    }

    const checkInputErrorsFunc = () => {
        setInputError({
            setEmail: "",
            setPassword: "",
            setConfirmPassword: ""
        })
        if (email.trim() === "") {
            setInputError((prev) => ({ ...prev, email: "* username is required" }));
        }
        if (password.trim() === "") {
            setInputError((prev) => ({ ...prev, password: "* password is required" }));
        }
        if (confirmPassword.trim() === "") {
            setInputError((prev) => ({ ...prev, confirmPassword: "* confirm password is required" }));
        }
        else if (confirmPassword !== password) {
            setInputError((prev) => ({ ...prev, confirmPassword: "* please enter same as above password" }));
        }
        setTimeout(() => {
            setInputError("");
        }, 3000)
    }

    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: async (newData) => {
            return await api.post('/user/login', newData)
        },
        onSuccess: (response) => {
            setMessage(response.data.message);
            setTimeout(()=>{
                setMessage("");
            }, 3000);

            navigate('/chat');

            setEmail("")
            setPassword("")
            setConfirmPassword("")
        },
        onError: (error) => {
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            }, 3000);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        checkInputErrorsFunc();

        loginMutation.mutate({
            email,
            password: confirmPassword
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login to ChatSync</h2>
                {loginMutation.isLoading && <Riple color="#ffffff" size="small" text="" textColor="#ffd7d7" />}
                {message && <p className={styles.loginFormMessage}>{message}</p>}
                {error && <p className={styles.loginFormError}>{error}</p>}
                <div onChange={(e) => setEmail(e.target.value)} className={styles.loginFormInputDiv}>
                    <input className={styles.loginFormTextInput} type="email" placeholder="Email" />
                    {inputError.email && <p className={styles.registerFormInputError}>* Email is required</p>}
                </div>
                <div className={styles.loginFormInputDiv}>
                    <input ref={passwordInputRef} onChange={(e) => setPassword(e.target.value)} className={styles.loginFormPasswordInput} type="password" placeholder="Password" />
                    {inputError.password && <p className={styles.registerFormInputError}>* Password is required</p>}
                    <div className={styles.loginFormShowPasswordDiv}>
                        <img onClick={onShowPasswordClick} className={styles.loginFormShowPassword} src={showPassword} alt="showPassword" />
                    </div>
                </div>
                <div className={styles.loginFormInputDiv}>
                    <input ref={confirmPasswordInputRef} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.loginFormPasswordInput} type="password" placeholder="Confirm Password" />
                    {inputError.confirmPassword && <p className={styles.registerFormInputError}>* Confirm Password should be same as Password</p>}
                    <div className={styles.loginFormShowPasswordDiv}>
                        <img onClick={onShowConfirmPasswordClick} className={styles.loginFormShowPassword} src={showPassword} alt="showPassword" />
                    </div>
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <span onClick={toRegisterFunc} className={styles.loginFormRegisterLink}>Register</span></p>
            </form>
        </div>
    )

}

export default LoginForm