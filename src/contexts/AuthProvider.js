import React, { useEffect, useState } from 'react';
import { createContext } from "react"
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from "../firebase/firebase.config"

export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState({displayName : 'Nasir Ullah'})

    // create user with email and password 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user with email and password 
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth)
    }

    // user observer 
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
             console.log(currentUser)
             setUser(currentUser)
         })
         return ()=> unsubscribe();
     },[])

    const authInfo ={
        user,
        createUser,
        logIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;