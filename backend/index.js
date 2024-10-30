const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();

// Activer CORS
app.use(cors());

// Définir le port en utilisant la variable d'environnement PORT, avec un fallback à 3000
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
