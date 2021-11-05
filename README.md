# django-example
This project is a program that registers pets. In this example, we will use Django as the backend and Angular as the frontend. The database will be MongoDB.
## Database
1. Install the database. In this case, we will use a MongoDB Docker.
```bash
sudo apt install docker.io
docker run -p 27017:27017 -v ~/docker/mongodb/data:/data/db --name django-example -d mongo
```

2. Connect to de MongoDB database
```bash
mongo --port 27017
```

3. Switch to the admin db
```mongo
use admin
```

4. Create the admin user
```mongo
db.createUser(
  {
    user: "admin",
    pwd: passwordPrompt(),
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

5. Check connect to the database with the URI `mongodb://localhost:27017/admin?authSource=admin --username admin`

## Backend
1. Create a virtual environment
```bash
sudo apt install python3 python3.9-venv
python3 -m venv .venv
source .venv/bin/activate
pip install Django djangorestframework djongo
```

2. Migrate the database
```bash
cd server
python manage.py makemigrations app
python manage.py migrate app
```

3. Run the server
```bash
python manage.py runserver 8080
```

## Frontend
We will use Angular for the frontend.

```bash
sudo apt install npm
npm install -g @angular/cli
cd server/client
npm install
ng serve
```

## Test
Enter to [http://localhost:4200/pet](http://localhost:4200/pet)

## API REST
| __Method__    | __Route__         | __Use__                           |
|---------------|-------------------|-----------------------------------|
| GET           | /api/pet/         | Get all pets                      |
| POST          | /api/pet/         | Create a pet                      |
| GET           | /api/pet/:id      | Search pet by Id                  |
| PUT           | /api/pet/:id      | Modify a pet                      |
| DELETE        | /api/pet/:id      | Delete pet by Id                  |
| GET           | /api/pet/search   | Search pet by attributes          |
