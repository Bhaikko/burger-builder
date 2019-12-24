# Burger Builder
Burger Builder is a Web-application where users can make burgers dynamically and order them.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

**requirements**
* nodejs
* mysql

**Frameworks Used**
* React

## Frontend Setup
Frontend files are in burger-builder-frontend <br>

To install packages, run
```
  cd burger-builder-frontend
  npm install
```

To run api server, run
```
  npm start
```

## Backend Setup
Backend Files are in burger-builder-api <br>

To install packages, run
```
  cd burger-builder-api
  npm install
```

To run api server, run
```
  npm start
```


### Database Setup
Once mysql is installed and can be accessed through CLI.
Login as root in mysql using
```
  mysql -u root -p
```

After logging in, run the following commands
```
  CREATE DATABASE burgerBuilder;
  CREATE USER "burgerBuilderAdmin" IDENTIFIED BY "123456";
  USE maitTalks;
  GRANT ALL PRIVILEGES ON burgerBuilder.* TO burgerBuilderAdmin;
  FLUSH PRIVILEGES;
  UPDATE mysql.user SET host = "localhost" WHERE user = "burgerBuilderAdmin";
```

For reviewing mysql database using CLI,
```
  mysql -u burgerBuilderAdmin -p
```

## Screenshots

### Homepage 
<a href="https://imgur.com/acScCp1"><img src="https://i.imgur.com/acScCp1.png" title="source: imgur.com" /></a>

### Order Page
<a href="https://imgur.com/maOb4Zn"><img src="https://i.imgur.com/maOb4Zn.png" title="source: imgur.com" /></a>

### Order Form
<a href="https://imgur.com/luImn2p"><img src="https://i.imgur.com/luImn2p.png" title="source: imgur.com" /></a>

### Myorders Page
<a href="https://imgur.com/3yiZUN6"><img src="https://i.imgur.com/3yiZUN6.png" title="source: imgur.com" /></a>

