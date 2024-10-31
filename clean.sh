#!/bin/bash
clean_bdd() {
    echo "Cleaning started"
    docker volume prune -f
}

clean_all() {

    docker volume prune -f

    docker network prune -f

    if [ -d "node_modules" ]; then
        rm -rf node_modules
    else
        echo "node_modules not found."
    fi

    echo "done"
}

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 {bdd|all}"
    exit 1
fi

case "$1" in
    bdd)
        clean_bdd
        ;;
    all)
        clean_all
        ;;
    *)
        exit 1
        ;;
esac
