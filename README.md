# Clone the project
After cloning, first thing to note is the project runs on **Docker**. There is a docker-compose.yaml file
which will start up a prosgres database for you. 

## NOTE: Before Running the project do the folowing 
- Open .env.template and copy what you see there and create a .env file and paste it there
- There is a seed data that will populate your database once upon starting the backend
    a. (Admin credentials: email : admin@example.com  || password: 1234)
    b. (User credentials: email : user@example.com  || password: 1234)

# Command you should know (you can find them in the package.json scripts)
  - npm run db:dev:restart :::: This will clean up your database and restart it and rerun migrations
  - npm run start:dev :::: This will start your backend project

# Run
- npm install  :::  to install packages
- npm run db:dev:restart ::: to start your docker and run migrations, ensure you have docker running on your PC
- npm run start:dev ::: to start your project.