import { initializeApp, getApps, getApp } from "firebase/app";
import { config } from './config'
import {
    getAuth,
} from "firebase/auth";
import {
    getFirestore,
    orderBy,
    query,
    startAt,
    getDocs,
    collection,
    doc,
    getDoc,
    setDoc,
    where,
    addDoc,
    updateDoc,
    onSnapshot,
    deleteDoc,
} from "firebase/firestore";

const app = !getApps().length ? initializeApp(config) : getApp()
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
    setDoc,
    addDoc,
    getDocs,
    getDoc,
    doc,
    collection,
    query,
    where,
    orderBy,
    startAt,
    updateDoc,
    onSnapshot,
    deleteDoc
};


