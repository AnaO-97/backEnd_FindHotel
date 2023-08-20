require("dotenv").config();
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const firebase = require('firebase-admin');

firebase.initializeApp({
    credential: applicationDefault()
});

module.exports = firebase;


// require("dotenv").config();
// const { initializeApp, applicationDefault } = require('firebase-admin/app');
// const firebase = require('firebase-admin');
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseAccountConfig = {
//     apiKey: process.env.FB_API_KEY,
//     authDomain: process.env.FB_AUTH_DOMAIN,
//     projectId: process.env.FB_PROJECT_ID,
//     storageBucket: process.env.FB_STORAGE,
//     messagingSenderId: process.env.FB_MESSAGE_ID,
//     appId: process.env.FB_APP_ID
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseAccountConfig);
// module.exports = firebase;