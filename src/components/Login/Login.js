import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'


const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
      }
    const handleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          const {displayName, email} = result.user;
          const signedInUser = {name: displayName, email}
          setLoggedInUser(signedInUser)
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(errorCode, errorMessage, email, credential)
        });
      
    }
    return (
    
        <div>
          
            <button onClick={handleSignIn}>sign in with google</button>
        </div>
    );
};

export default Login;