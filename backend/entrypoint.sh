cd /src/backend

python manage.py makemigrations
python manage.py migrate

if [[ $SYSTEM_ENV != "development" && ! -f initialized  ]]; then
	python3 manage.py initdata
	touch initialized
fi

python manage.py collectstatic --noinput

gunicorn backend.wsgi -b 0.0.0.0:8000 -w 2
