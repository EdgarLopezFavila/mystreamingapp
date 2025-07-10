import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCYGicsNz276Bv9D_LXjyqtoOkpiMdbnfQ",
  authDomain: "streamin-app-test.firebaseapp.com",
  projectId: "streamin-app-test",
  storageBucket: "streamin-app-test.firebasestorage.app",
  messagingSenderId: "921849289682",
  appId: "1:921849289682:web:ba9cd0aafefab27dfd860b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (error) {
        toast.error(error.code);
    }
}

const signin = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        toast.error(error.code);
    }
}

const signout = () => {
    signOut(auth);
}

export {
    auth,
    db,
    signup,
    signin,
    signout
};