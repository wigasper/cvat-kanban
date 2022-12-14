# Development

For development, a docker-compose file is provided in
`docker-compose.dev.yml`. These containers are suitable for
development and will allow acess to the API from the 
`npm` development server.

They can be brought up with:

```
docker-compose -f docker-compose.dev.yml up 
```

Additionally, an environmental variable should be set
for the front end: 

```
NODE_ENV=development
```

Then, the `npm` development server can be used.
