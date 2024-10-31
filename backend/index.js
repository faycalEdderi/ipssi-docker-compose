const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Activer CORS
app.use(cors({
  origin: process.env.FRONTEND_URL, // Utilisez l'URL frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Configurer la connexion à la base de données
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Route pour récupérer tous les items
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items'); // Remplacez par le nom de votre table
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Route pour créer un nouvel item
app.post('/api/data', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query('INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Route pour mettre à jour un item
app.put('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query('UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Item non trouvé');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Route pour supprimer un item
app.delete('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1', [id]);
    if (result.rowCount > 0) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).send('Item non trouvé');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
