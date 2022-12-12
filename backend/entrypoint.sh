cd /src/backend

python manage.py makemigrations
python manage.py migrate

gunicorn backend.wsgi -b 0.0.0.0:8000 -w 2
