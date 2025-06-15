import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)


export default firebaseApp