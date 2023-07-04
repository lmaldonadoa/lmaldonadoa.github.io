const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase/service-account.json'); // Reemplaza esto con la ruta a tu archivo de cuenta de servicio

// Inicializa la app de Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const port = 3000;

app.get('/export', async (req, res) => {
  try {
    let collectionName = "documentos"; // Replace with your collection name
    let collectionRef = db.collection(collectionName);
    let querySnapshot = await collectionRef.get();
    let docs = querySnapshot.docs.map(doc => {
      let docData = doc.data();
      docData.id = doc.id; // Include the document ID in the data
      
      // Parse "planimetria" field from JSON string to JS object
      try {
        docData.planimetria = JSON.parse(docData.planimetria);
      } catch (e) {
        console.error(`Error parsing planimetria in document ${doc.id}:`, e);
      }

      return docData;
    });

    res.json(docs);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send('Hubo un error obteniendo los datos.');
  }
});



app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`)
});
