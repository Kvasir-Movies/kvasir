# Install python somehow

# Install virtualenv
https://docs.python-guide.org/dev/virtualenvs/
https://stackoverflow.com/questions/31133050/virtualenv-command-not-found

# Make virtual env
virtualenv -p python3 kvasir
source ~/kvasir/kvasir-env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Dev db setup
Install postgres locally (https://postgresapp.com/ is an easy way)

Create db
(in bash) > psql
(in psql) > create database kvasir_dev;

# Upgrade db
> flask db upgrade

########FRONTEND########
# Install node
# Install yarn
