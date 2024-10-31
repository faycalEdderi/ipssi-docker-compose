import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        // Gérer la réponse ici
        setItems(response.data);
      })
      .catch(error => {
        console.error('Erreur API:', error);
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>Mon Application</h1>
      {error && <p>Erreur de récupération des données.</p>}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
