import React from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  React.useEffect(() => {
    axios.get(`${apiUrl}`)
      .then(response => {
        // Gérer la réponse ici
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur API:', error);
      });
  }, []);

  return (
    <div>
      <h1>Mon Application</h1>
    </div>
  );
};

export default App;
