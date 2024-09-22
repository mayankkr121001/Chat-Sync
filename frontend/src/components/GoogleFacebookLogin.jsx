import React from 'react'
import googleLogo from '../assets/google.png'
import facebookLogo from '../assets/facebook.png'
import styles from './css modules/GoogleFacebookLogin.module.css'

function GoogleFacebookLogin() {
  return (
    <div className={styles.googleFacebookLoginDiv}>
        <button>
            <img src={googleLogo} alt="googleLogo" />   
            <p>Login with Google</p>
        </button>
        <button>
            <img src={facebookLogo} alt="facebookLogo" />   
            <p>Login with Facebook</p>
        </button>
    </div>
  )
}

export default GoogleFacebookLogin