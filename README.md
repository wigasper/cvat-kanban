![](https://github.com/wigasper/cvat-kanban/workflows/CI/badge.svg)

# CVAT Kanban

This web app is a kanban board application intended to be a standalone 
prototype that may eventually be integrated into CVAT. `cvat-kanban`
provides a kanban board engineered specifically for image annotation
projects, with task-specific design features that are 
not present in general purpose kanban board web apps. 

## Installation

```bash
# clone the repo, set up .env
git clone https://github.com/wigasper/cvat-kanban
cd cvat-kanban
echo 'SECRET_KEY="test_deployment_key"' > .env

# build and run
docker-compose up --build web db

# perform migrations
docker-compose exec web python backend/manage.py migrate

# create a super user
docker-compose exec web python backend/manage.py createsuperuser

# load fixtures data
docker-compose exec web python backend/manage.py initdata

```

## Getting started

After the initial installation, the app can be deployed at
any time:

```bash
docker-compose up web db
```

The Django REST framework API browser for the kanban API is then accessible at
[http://localhost:8000/kanban/](http://localhost:8000/kanban/).
For convenient testing, a sample user is provided with the username
`alice` and the password `anchovies`.

## License

[The MIT License](https://github.com/wigasper/cvat-kanban/blob/main/LICENSE)
