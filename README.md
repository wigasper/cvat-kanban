![](https://github.com/wigasper/cvat-kanban/workflows/CI/badge.svg)

# CVAT Kanban

This web app is a kanban board application intended to be a standalone 
prototype that may eventually be integrated into CVAT. `cvat-kanban`
provides a kanban board engineered specifically for image annotation
projects, with task-specific design features that are 
not present in general purpose kanban board web apps. 

## Deployment

First, make sure to generate a secret key and store it in `.env`.
For example, from the root project directory (if Django is installed):

```bash
key=`python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
echo -e "SECRET_KEY = '$key'" >> .env
```

Or, just generate a random ASCII string some other way.

Next, add the host to `backend/backend/settings.py`:

```
ALLOWED_HOSTS = ["localhost", "0.0.0.0", "your.host.here"]
```

Then, build and bring up the containers:

```bash
docker-compose up
```

This may take some time and building the front end may require
more than 1GB of memory.

Next, feel free to create an admin user:

```bash
docker-compose exec web python backend/manage.py createsuperuser
```

The app is then available at the host address.

The app will be populated with some initial data just to 
provide examples, but it is recommended to remove the
`alice` user, as the password (`anchovies`) is readily 
available.

The admin panel is then available at `http://$HOST/admin/`.

For the current scope and deployment of this project, account
creation is not supported outside of the admin panel.

## API endpoints

There are several DRF browsable endpoints available at 
`/kanban/cards/`, `/kanban/boards/`, `/kanban/columns/`.

For authentication, tokens can be retrieved from 
`/accounts/auth/token/login`, and the logout endpoint is
`/accounts/auth/token/logout`.

## License

[The MIT License](https://github.com/wigasper/cvat-kanban/blob/main/LICENSE)
