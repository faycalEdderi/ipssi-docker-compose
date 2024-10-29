# frontend.dockerfile
FROM node:14

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY ./src ./src

# Construire l'application
RUN npm run build

# Exposer le port de l'application
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "run", "serve"]
