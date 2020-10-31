import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDYt3OF7irKx1Va069tX7KX7waHE_UIhqQ",
    authDomain: "rent-a-car-78289.firebaseapp.com",
    databaseURL: "https://rent-a-car-78289.firebaseio.com",
    projectId: "rent-a-car-78289",
    storageBucket: "rent-a-car-78289.appspot.com",
    messagingSenderId: "798115532448",
    appId: "1:798115532448:web:fe1400a7383e407ac8c3c5"
};

firebase.initializeApp(firebaseConfig);

export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();
