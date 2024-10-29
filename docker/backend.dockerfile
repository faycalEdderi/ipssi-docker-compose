# Utiliser l'image officielle de Node.js
FROM node:14

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY ./backend/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY backend/src .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "index.js"]
