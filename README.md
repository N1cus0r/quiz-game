## Quiz Game

This is an application with provides the ability to play create an participate in quizzes. It is built using Django with DRF for the server part and ReactJS for the client part. The stack includes:

- ReactJS client
- Django REST API
- Postgresql as database
- Redis as message broker for django channel layer
- Daphne as an application server
- Nginx as web server

### Installation

- Clone this repository using

```bash
    git clone https://github.com/N1cus0r/crypto-monitor.git
```

- Build and run docker containers

```bash
docker-compose build

docker-compose run
```

- Run migrations and generate some random questions

```bash
python manage.py migrate

python manage.py generatequestions
```

- Start the containers and you are good to go

```bash
docker-compose up
```

The application will be available on **localhost** or **127.0.0.1** and you don't have to specify the port.

> **Note**
> Games wont be created without generated questions
