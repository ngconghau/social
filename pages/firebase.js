import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCp5CNCoNbryrSFFEoPoqKZQoNX-Pw7hCU',
  authDomain: 'social-c1e5e.firebaseapp.com',
  projectId: 'social-c1e5e',
  storageBucket: 'social-c1e5e.appspot.com',
  messagingSenderId: '356066386689',
  appId: '1:356066386689:web:f8721d750d5f58dec3f100',
}

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
