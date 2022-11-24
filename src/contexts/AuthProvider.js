import React, { useState } from 'react';
import { createContext } from "react"
import {getAuth} from 'firebase/auth'
import app from "../firebase/firebase.config"

export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState({displayName : 'Nasir Ullah'})

    const authInfo ={
        user
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;