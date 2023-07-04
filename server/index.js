// index.js
const express = require('express');
const db = require('./planoservice'); // Asegúrate de que esta ruta es correcta

const app = express();
const port = 3000;

app.get('/export', async (req, res) => {
  try {
    let collectionName = "documentos"; // Sustituye esto por el nombre de tu colección
    let collectionRef = db.collection(collectionName);
    let querySnapshot = await collectionRef.get();
    let docs = querySnapshot.docs.map(doc => {
      let docData = doc.data();
      docData.id = doc.id; // Incluye el ID del documento en los datos
      
      // Parsea el campo "planimetria" de string JSON a objeto JS
      try {
        docData.planimetria = JSON.parse(docData.planimetria);
      } catch (e) {
        console.error(`Error parseando planimetria en el documento ${doc.id}:`, e);
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
