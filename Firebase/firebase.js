import { initializeApp, getApps, getApp } from "firebase/app";
import { config } from './config'
import {
    getAuth,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    doc,
    setDoc,
    where,
    addDoc,
    updateDoc
} from "firebase/firestore";
// if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
// const app = initializeApp(config);
const app = !getApps().length ? initializeApp(config) : getApp()
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
    setDoc,
    addDoc,
    getDocs,
    doc,
    collection,
    query,
    where,
    updateDoc
};


