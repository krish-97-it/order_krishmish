# order_krishmish
Online food order service

# install necessary Software
1. NodeJs (Ideal Version 20)
3. Vs Code
4. Mongo Db comunity server & mongo db compass - 
   Windows:
      a. Download and install mongo db community server from - https://www.mongodb.com/try/download/community
      b. During installation you have to select [run service as network service User] and check install mongo db Compass also else you have to install it seperately

   MacOs:
      a. Open terminal and run this commands -  
         brew tap mongodb/brew
         brew update
         brew install mongodb-community@7.0
      b. To run mongod server as macos server run this command
         brew services start mongodb-community@7.0
      
      c. Open Shell and type mongosh

      d. download and isntall mongodb compass to manupulate data easily.

5. Postman


# Steps To Create Project From Scratch
1. Create two folder inside main folder.
   a. frontend - client side code will be written in react Js
   b. backend - server side code will be written here using node and express Js

2. Creating / initializing our react app as frontend-
   a. Go inside required folder and run:
      cd frontend
      
   b. Run to create app -
      npx create-react-app .

   c. Run your app -
      npm run start

   d. Hit in browser -
      http://localhost:3000 

3. Creating / initializing backend app
   a. initalize app inside backend folder-
      npm init [ref: https://expressjs.com/en/starter/installing.html ]

   b. install dependencies / packages by running the following commands -
      npm install express
      npm install dotenv
      npm install mongoose
      npm install nodemon --save-dev
   
   c. create two file named as app.js and  server.js where we can write our code to start backend server

   d. Run your app -
      node server.js 
      or 
      npm run dev 







# Local setup

Before Starting Setup check your Node Version should be 20

1. Clone repo inside a Folder.

2. Open Mongo db compass and creeate a database named - krishmish_order_food. Then import collection inside that db.

1. To Run Frontend React Project:
   a. cd frontend
   b. npm install
   c. npm run start

2. To Run Backend Node & Express Project
   a. cd backend
   b. npm install
   c. npm run dev  (To run In development)
      npm run prod (To run in Production Mode)
      (For windows go inside backend folder -> package.json -> under scripts-> instead of 'export' use 'set' as export' command is valid only for unix shells)




