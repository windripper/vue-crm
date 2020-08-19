import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyD1lBIcsIRAPRwDM8nd2qfgULxLHR0_30g',
    authDomain: 'vue-crm-28647.firebaseapp.com',
    databaseURL: 'https://vue-crm-28647.firebaseio.com',
    projectId: 'vue-crm-28647',
    storageBucket: 'vue-crm-28647.appspot.com',
    messagingSenderId: '551939557946',
    appId: '1:551939557946:web:06ce01b8167ee028420303'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth
};
