# Utiliser une image Python
FROM python:3.9-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier requirements.txt et installer les dépendances
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code du backend
COPY src/ ./src

# Exposer le port interne pour Django
EXPOSE 8000

# Démarrer le serveur Django
CMD ["python", "src/manage.py", "runserver", "0.0.0.0:8000"]
