# How to use docker and docker-compose

## docker-compose

```sh
# Run application
$ docker-compose up

# Run test
$ docker-compose -f docker-compose.yml -f docker-compose.test.yml up

# build no-cache
$ docker-compose build --no-cache

# build with image name 
$ docker build -t basd4g/lovelab-api:1.0 .
# push to docker-hub
$ docker push basd4g/lovelab-api:1.0
```
