import React, {useState, useRef } from 'react'
import { useMutation } from 'react-query';
import api from '../interceptors/axios.js'
import {Riple} from "react-loading-indicators"
import showPassword from '../assets/showPassword.png';
import styles from './css modules/RegisterLoginForm.module.css'


function RegisterForm({toLoginFunc}) {
    const [name, setName] = useState('');
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

    const checkInputErrorsFunc = ()=>{
        setInputError({
            name: "",
            setEmail: "",
            setPassword: "",
            setConfirmPassword: ""
        })
        if (name.trim() === "") {
            setInputError((prev) => ({ ...prev, name: "* username is required" }));
        }
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
        setTimeout(()=>{
            setInputError("");
        }, 3000)
    }

    const registerMutation = useMutation({
        mutationFn: async (newData) => {
            return await api.post("/user/register", newData)
        }, 
        onSuccess: (response)=> {
            // console.log(data);
            setMessage(response.data.message + ". Please Verify your email before login .");
            setTimeout(()=>{
                setMessage("");
            }, 3000);
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        },
        onError: (error) => {
            // console.log(error)
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            }, 3000);
        }

    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        checkInputErrorsFunc();

        registerMutation.mutate({
            name,
            email,
            password: confirmPassword
        });  
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
            
                <h2>Register to ChatSync</h2>
                {registerMutation.isLoading && <Riple color="#ffffff" size="small" text="" textColor="#ffd7d7" />}
                {message && <p className={styles.registerFormMessage}>{message}</p>}
                {error && <p className={styles.registerFormError}>{error}</p>}
                <div className={styles.registerFormInputDiv}>
                    <input onChange={(e) => setName(e.target.value)} className={styles.registerFormTextInput} type="text" placeholder="Name" value={name}/>
                    {inputError.name && <p className={styles.registerFormInputError}>* Name is required</p> }
                </div>
                <div className={styles.registerFormInputDiv}>
                    <input onChange={(e) => setEmail(e.target.value)} className={styles.registerFormTextInput} type="email" placeholder="Email" value={email}/>
                    {inputError.email && <p className={styles.registerFormInputError}>* Email is required</p>}
                </div>
                <div className={styles.registerFormInputDiv}>
                    <input ref={passwordInputRef} onChange={(e) => setPassword(e.target.value)} className={styles.registerFormPasswordInput} type="password" placeholder="Password" value={password}/>
                    {inputError.password && <p className={styles.registerFormInputError}>* Password is required</p>}
                    <div className={styles.registerFormShowPasswordDiv}>
                        <img onClick={onShowPasswordClick} className={styles.registerFormShowPassword} src={showPassword} alt="showPassword" />
                    </div>
                </div>
                <div className={styles.registerFormInputDiv}>
                    <input ref={confirmPasswordInputRef} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.registerFormPasswordInput} type="password" placeholder="Confirm Password" value={confirmPassword}/>
                    {inputError.confirmPassword && <p className={styles.registerFormInputError}>* Confirm Password should be same as Password</p>}
                    <div className={styles.registerFormShowPasswordDiv}>
                        <img onClick={onShowConfirmPasswordClick} className={styles.registerFormShowPassword} src={showPassword} alt="showPassword" />
                    </div>
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <span onClick={toLoginFunc} className={styles.registerFormLoginLink}>Login</span></p>
            </form>
        </div>
    )
}

export default RegisterForm