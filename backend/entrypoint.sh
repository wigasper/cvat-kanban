cd /src/backend
python manage.py makemigrations
python manage.py migrate
python manage.py initdata

gunicorn backend.wsgi
