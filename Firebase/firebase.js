import { initializeApp } from "firebase/app";
import { config } from './config'
import {
    getAuth,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";


const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    auth,
    db,
    addDoc,
    collection
};


