import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"


firebase.initializeApp({
    apiKey: "AIzaSyDWFe0CN3E-OCp9NdST1pcD4RUQ6F3cVd4",
    authDomain: "reels-b5877.firebaseapp.com",
    projectId: "reels-b5877",
    storageBucket: "reels-b5877.appspot.com",
    messagingSenderId: "480924060964",
    appId: "1:480924060964:web:c0446ee3d3fbe0f2b577b1"
})

export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimeStamp,
}

export const storage=firebase.storage();