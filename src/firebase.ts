import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDIVuIHilMcsFXz3h4DDtcnfBPXJsH35gA",
    authDomain: "discord-2d126.firebaseapp.com",
    projectId: "discord-2d126",
    storageBucket: "discord-2d126.appspot.com",
    messagingSenderId: "419994572584",
    appId: "1:419994572584:web:8d1880b9a5a303c70e621d"
};

const app = firebase.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, db }