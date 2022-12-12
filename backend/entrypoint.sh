cd /src/backend

python manage.py makemigrations
python manage.py migrate

if [[ ! -f initialized ]]; then
	python3 manage.py initdata
	touch initialized
fi

gunicorn backend.wsgi -b 0.0.0.0:8000 -w 2
