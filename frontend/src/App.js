import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

axios.get(`${apiUrl}`)
  .then(response => {
    // gérer la réponse ici
  })
  .catch(error => {
    console.error('Erreur API:', error);
  });
