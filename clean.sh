#!/bin/bash

clean_bdd() {
    echo "Démarrage du nettoyage des volumes de base de données..."
    docker-compose down
    docker volume prune -f
    echo "Nettoyage des volumes de base de données terminé."
}

clean_all() {
    echo "Démarrage du nettoyage complet..."

    docker-compose down
    docker container prune -f

    docker volume prune -f

    docker network prune -f

    if [ -d "node_modules" ]; then
        echo "Suppression de node_modules"
        rm -rf node_modules
        echo "node_modules supprimé."
    else
        echo "Dossier node_modules non trouvé."
    fi

    echo "Nettoyage complet terminé."
}

# Vérifier le nombre d'arguments
if [ "$#" -ne 1 ]; then
    echo "Utilisation : $0 {bdd|all}"
    exit 1
fi

# Exécuter la fonction en fonction de l'argument passé
case "$1" in
    bdd)
        clean_bdd
        ;;
    all)
        clean_all
        ;;
    *)
        echo "Option invalide : $1"
        echo "Utilisation : $0 {bdd|all}"
        exit 1
        ;;
esac
