// planoservice.js
const admin = require('firebase-admin');
const serviceAccount = require('../firebase/service-account.json'); 

// Inicializa la app de Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
