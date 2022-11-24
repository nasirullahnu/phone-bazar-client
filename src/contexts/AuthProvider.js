import React, { useEffect, useState } from 'react';
import { createContext } from "react"
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth'
import app from "../firebase/firebase.config"

export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState({displayName : 'Nasir Ullah'})

    // create user with email and password 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
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
        user, createUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;