import React, { useState } from 'react';
import { createContext } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const providerLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const verifyUserEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const updateUserProfile = profile => {
        return updateProfile(auth.currentUser, profile)
    }

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log('inside on state changer', currentUser)
            if (currentUser === null || currentUser.emailVerified) {
                setUser(currentUser);
            }
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = { user, providerLogin, logOutUser, createUser, logInUser, loading, setLoading, updateUserProfile, verifyUserEmail }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;