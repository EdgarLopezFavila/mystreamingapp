import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCYGicsNz276Bv9D_LXjyqtoOkpiMdbnfQ",
  authDomain: "streamin-app-test.firebaseapp.com",
  projectId: "streamin-app-test",
  storageBucket: "streamin-app-test.firebasestorage.app",
  messagingSenderId: "921849289682",
  appId: "1:921849289682:web:ba9cd0aafefab27dfd860b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    toast.error(error.code);
  }
};

const signin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code);
  }
};

const signout = () => {
  signOut(auth);
};

const buyOrRentMovie = async (idMovie, flagBuy) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const docRef = await addDoc(collection(db, "movies_by_user"), {
      uid: user.uid, 
      uidMovie: idMovie,
      status: flagBuy ? "BUY" : "RENT",
      createdAt: new Date()
    });

    toast.success(`${flagBuy ? "Compra" : "Renta"} realizada exitosamente`);
    return docRef;
  } catch (error) {
    toast.error("Error: " + error.message);
  }
};

const getBuyOrRentMovieByUser = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Usuario no autenticado');
        }

        const q = query(
            collection(db, "movies_by_user"),
            where('uid', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        toast.error('Error al consultar: ' + error.message);
    }
}

const getBuyOrRentMovieById = async (idMovie) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Usuario no autenticado');
        }

        const q = query(
            collection(db, "movies_by_user"),
            where('uid', '==', user.uid),
            where('uidMovie', '==', idMovie)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        toast.error('Error al consultar: ' + error.message);
    }
}

export { auth, db, signup, signin, signout, buyOrRentMovie, getBuyOrRentMovieByUser, getBuyOrRentMovieById };
