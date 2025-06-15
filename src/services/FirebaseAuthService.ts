// src/services/FirebaseAuthService.ts
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signOut,
    type UserCredential,
    type User,
    getRedirectResult,
    signInWithPopup,
    sendEmailVerification,


} from "firebase/auth";
import { auth } from "../configs/firebaseInit";
import { FirestoreService } from "./FirestoreServices";



export class FirebaseAuthService {
    static async googleLogin(): Promise<UserCredential | null> {
        try {
            const provider = new GoogleAuthProvider()
            const userCredentials = await signInWithPopup(auth, provider)
            console.log(userCredentials);

            if (!userCredentials) return null
            const role = await FirestoreService.getRoleByUid(userCredentials.user.uid)
            if (role != "admin" && role != "moderator") {

                throw new Error("Acceso no permitido")
            }
            return userCredentials

        } catch (err) {
            this.logOut()
            console.error(err);
            return null

        }
    }



    static async googleLoginResponse(): Promise<UserCredential | null> {
        try {
            const result = await getRedirectResult(auth);
            console.log("result redirect", result);

            if (!result) return null
            const role = await FirestoreService.getRoleByUid(result.user.uid)
            if (role != "admin" && role != "moderator") {

                throw new Error('Permiso denegado')
            }
            return result;
        } catch (err) {
            this.logOut()
            console.error(err);
            return null;
        }
    }



    static async login(email: string, password: string): Promise<UserCredential | null> {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const role = await FirestoreService.getRoleByUid(userCredential.user.uid)
            if (role != "admin" && role != "moderator") {

                throw new Error('Permiso denegado')
            }
            if (userCredential.user.emailVerified) return userCredential;

            return null;
        } catch (e) {
            this.logOut()
            window.alert("Login inválido")
            return null;
        }
    }

    static async register(email: string, password: string): Promise<boolean> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                await sendEmailVerification(userCredential.user)
                return true
            }
            return false;
        } catch (e) {
            this.logOut()
            window.alert("Registro inválido")
            return false;
        }
    }

    static async forgot(email: string): Promise<boolean> {

        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    static async logOut(): Promise<void> {
        try {
            await signOut(auth);

        } catch (err) {
            console.error("Logout error", err);
        }
    }

    static async getCurrentUser(): Promise<User | null> {

        return auth.currentUser;
    }
}
