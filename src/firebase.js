
import { initializeApp} from "firebase/app";
import { createUserWithEmailAndPassword,
   getAuth, signInWithEmailAndPassword,
   signOut } from "firebase/auth";
import { collection,
   addDoc,
    getFirestore } from "firebase/firestore";
// import { Await } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import{FirebaseAuth} from 'firebase/app'



const firebaseConfig = {
  apiKey: "AIzaSyCDOVp8kjeCsXJvpnlY-aj0VDXXOPWZbDQ",
  authDomain: "netflix-clone-3c73e.firebaseapp.com",
  projectId: "netflix-clone-3c73e",
  storageBucket: "netflix-clone-3c73e.firebasestorage.app",
  messagingSenderId: "237655079693",
  appId: "1:237655079693:web:8ca0d0754d58f656b08e44"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try{
       const res= await  createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       await addDoc (collection(db,"user"),{
        uid:user.uid,
        name,
        password,
        authProvider:"local",
        email,
       });
    }catch(error){
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}
const login=async (email,password)=>{
try{
   await signInWithEmailAndPassword(auth,email,password)
}catch(error){
   console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "));  

}
}
const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};