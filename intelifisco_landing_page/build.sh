#!/usr/bin/env bash

# Instalar dependências
pip install -r requirements.txt

# Executar migrações
python3 manage.py makemigrations --noinput
python3 manage.py migrate --noinput

# Coletar arquivos estáticos
python3 manage.py collectstatic --noinput --clear