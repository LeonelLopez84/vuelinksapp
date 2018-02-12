import * as Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyC9pI72_JQPvX_H4YY6qyO72iVsRh4Ug7U',
  authDomain: 'vuejsfirebase-22357.firebaseapp.com',
  databaseURL: 'https://vuejsfirebase-22357.firebaseio.com',
  projectId: 'vuejsfirebase-22357',
  storageBucket: '',
  messagingSenderId: '711809900922'
}

export default !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.app()
