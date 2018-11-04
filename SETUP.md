# Set environment variables
export DATABASE_URL="postgresql://localhost/kvasir_dev"
export FLASK_APP=kvasir/app.py

# Dev db setup
Install postgres locally (https://postgresapp.com/ is an easy way)

Create db
> psql
> create database kvasir_dev

# Upgrade db
> flask db upgrade