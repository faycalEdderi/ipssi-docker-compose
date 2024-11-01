import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [selectedItem, setSelectedItem] = useState({ id: '', name: '', description: '' });

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

  // Fonction pour créer un nouvel élément
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl, newItem);
      fetchData();
      setNewItem({ name: '', description: '' }); // Réinitialiser le formulaire de création
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  // Fonction pour mettre à jour un élément
  const handleUpdate = (item) => {
    setSelectedItem({ id: item.id, name: item.name, description: item.description });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (selectedItem.id) {
      setSelectedItem((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/${selectedItem.id}`, selectedItem);
      fetchData();
      setSelectedItem({ id: '', name: '', description: '' }); // Réinitialiser le formulaire de modification
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  // Fonction pour supprimer un élément
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div>
      <h1>Mon Application CRUD</h1>
      {error && <p>Erreur de récupération des données.</p>}

      {/* Formulaire de création d'un nouvel élément */}
      <form onSubmit={handleCreate}>
        <h2>Créer un nouvel item</h2>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          placeholder="Nom"
        />
        <textarea
          name="description"
          value={newItem.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Créer</button>
      </form>

      {/* Liste des éléments avec options de modification et de suppression */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button onClick={() => handleUpdate(item)}>Modifier</button>
            <button onClick={() => handleDelete(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {/* Formulaire de modification d'un élément existant */}
      {selectedItem.id && (
        <form onSubmit={handleSubmitUpdate}>
          <h2>Modifier l'item</h2>
          <input
            type="text"
            name="name"
            value={selectedItem.name}
            onChange={handleChange}
            placeholder="Nom"
          />
          <textarea
            name="description"
            value={selectedItem.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <button type="submit">Mettre à jour</button>
        </form>
      )}
    </div>
  );
};

export default App;
