import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
	apiKey: "AIzaSyCUQtaWZu7GmBgX4j1DcFBzCqliCkOE5U0",
	authDomain: "chatapp-5255c.firebaseapp.com",
	databaseURL: "https://chatapp-5255c.firebaseio.com",
	projectId: "chatapp-5255c",
	storageBucket: "chatapp-5255c.appspot.com",
	messagingSenderId: "380143631903",
	appId: "1:380143631903:web:1cb78aa3887e2402"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
