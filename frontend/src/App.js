import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setItems(response.data);
    } catch (error) {
      console.error('Erreur API:', error);
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    }
  };

  const handleUpdate = async (id) => {
    const updatedItem = { name: 'Nouveau nom', description: 'Nouvelle description' }; // Remplacez par vos valeurs
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedItem);
      setItems(items.map(item => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div>
      <h1>Mon Application</h1>
      {error && <p>Erreur de récupération des données.</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button onClick={() => handleUpdate(item.id)}>Mettre à jour</button>
            <button onClick={() => handleDelete(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
