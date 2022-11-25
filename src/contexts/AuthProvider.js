import React, { useEffect, useState } from 'react';
import { createContext } from "react"
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from "../firebase/firebase.config"

export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState({displayName : 'Nasir Ullah'})
    const [loading, setLoading] = useState(true)

    // create user with email and password 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user with email and password 
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // update user and get user name 
    const updateUser = (userInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo);
    }

    // create user with google sign up 
    const googleSignin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        return signOut(auth)
    }

    // user observer 
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            //  console.log(currentUser)
             setUser(currentUser)
             setLoading(false)
         })
         return ()=> unsubscribe();
     },[])

    const authInfo ={
        user,
        createUser,
        logIn,
        googleSignin,
        updateUser,
        logOut,
        loading 
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;