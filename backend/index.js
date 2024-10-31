const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();

// Activer CORS
app.use(cors({
  origin:'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Définir le port en utilisant la variable d'environnement PORT, avec un fallback à 3000
const port = process.env.PORT || 3000;

// Exemple de données à envoyer
const data = [
  { id: 1, name: 'Item 1', description: 'Description de l\'item 1' },
  { id: 2, name: 'Item 2', description: 'Description de l\'item 2' },
  { id: 3, name: 'Item 3', description: 'Description de l\'item 3' },
];

// Route principale
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route pour récupérer les données
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
