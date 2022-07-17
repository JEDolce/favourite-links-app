# Favourite-links-app

Application to save favourite links locally. 
There is a minimal register interface that requires your full name, username and password. After that you can login to start saving your favourite links, adding a title and description. Finally, you can update or delete the links. 

It contains the following pages:

  - Home
  - Register / Sign up
  - Login / Sign In
  - Links

## Technologies used

- Node & Express
- MySQL 
- Handlebars
- Bootstrap 5

## Setup

This project requires the following dependecies:
    
    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-handlebars": "^6.0.6",
    "express-mysql-session": "^2.1.8",
    "express-session": "^1.17.3",
    "express-validator": "^6.14.2",
    "morgan": "^1.10.0",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.18",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "timeago.js": "^4.0.2"

To install the project, just download it directly from terminal with "git clone https://github.com/JEDolce/favourite-links-app.git", and then run npm install or yarn add. 

After installing the project you'll need to create the dabatabase on MySQL. For that purpose, just pass the information on the file db.sql to MySQL Workbench or MySQL started on the terminal.

You'll also need to configure the connection to the db by adding your MySQL username and password in the file "keys.js".






