# docker/frontend.dockerfile

# Étape de construction
FROM node:16-alpine as build

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances
COPY src/package*.json ./
RUN npm install

# Copier le code du frontend et construire le projet
COPY src/ ./
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
