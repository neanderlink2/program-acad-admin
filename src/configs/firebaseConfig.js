import 'firebase/auth';
import firebase from 'firebase/app';
import store from './middlewares';
import { toast } from 'react-toastify';
import { storeUser, removeUser } from '../modules/account/actions/authHandler';

const firebaseConfig = {
    apiKey: "AIzaSyDUlqW3Y4a0Gaz2TNgYQrEmS5PT6-4qLNY",
    authDomain: "program-acad.firebaseapp.com",
    databaseURL: "https://program-acad.firebaseio.com",
    projectId: "program-acad",
    storageBucket: "program-acad.appspot.com",
    messagingSenderId: "275006240028",
    appId: "1:275006240028:web:2cd6b7bc6e10c7276036d9",
    measurementId: "G-ZQ33KPF8CM"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const authenticationProviders = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    githubProvider: new firebase.auth.GithubAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider()
};

firebaseAppAuth.onIdTokenChanged(
    (user) => {
        if (user) {
            user.getIdTokenResult()
                .then(result => {
                    store.dispatch(storeUser({ user: user, token: result.token }));
                })
        }
    },
    (error) => {

    }
);

export const firebaseErrorCodes = {
    NOT_FOUND: "auth/user-not-found",
    WRONG_PASSWORD: "auth/wrong-password",
    INVALID_EMAIL: "auth/invalid-email",
    ACCOUNT_EXISTING: "auth/account-exists-with-different-credential",
    POPUP_CLOSED: "auth/popup-closed-by-user"
};

const handleAuthError = (code) => {
    switch (code) {
        case firebaseErrorCodes.ACCOUNT_EXISTING:
            toast.warn("Conta já existente.");
            return;
        case firebaseErrorCodes.INVALID_EMAIL:
            toast.warn("E-mail está em um formato inválido.");
            return;
        case firebaseErrorCodes.NOT_FOUND:
            toast.warn("E-mail ou senha estão incorretos.");
            return;
        case firebaseErrorCodes.POPUP_CLOSED:
            return;
        case firebaseErrorCodes.WRONG_PASSWORD:
            toast.warn("E-mail ou senha estão incorretos.");
            return;
    }
}

export const signInWithSimple = async (email, password) => {
    try {
        var response = await firebaseAppAuth.signInWithEmailAndPassword(email, password);
        return response;
    } catch (error) {
        handleAuthError(error.code);
        return response;
    }
}

export const signInWithFacebook = async () => {
    try {
        var response = await firebaseAppAuth.signInWithPopup(authenticationProviders.facebookProvider);
        return response;
    } catch (error) {
        handleAuthError(error.code);
        return error;
    }
}


export const signInWithGithub = async () => {
    try {
        var response = await firebaseAppAuth.signInWithPopup(authenticationProviders.githubProvider);
        return response;
    } catch (error) {
        handleAuthError(error.code);
        return error;
    }
}

export const signInWithGoogle = async () => {
    try {
        var response = await firebaseAppAuth.signInWithPopup(authenticationProviders.googleProvider);
        return response;
    } catch (error) {
        handleAuthError(error.code);
        return error;
    }
}

export const signOut = () => {
    store.dispatch(removeUser());
    return firebaseAppAuth.signOut();
}

export const sendPasswordReset = (email) => {
    return firebaseAppAuth.sendPasswordResetEmail(email);
}