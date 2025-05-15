const express = require('express');
const mysql = require('mysql2');
const app = express();
let port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'testdb'
})

connection.connect((err) =>{
    if(err){
        console.log(err);
        return;
    }

    console.log("Connection has been created");

    const creationQuery = `create table Students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20)
    )`

    connection.execute(creationQuery, (err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }

        console.log("Table is created");
    });
})

app.get('/', (req, res)=>{
    res.send("Hello Abhishek")
})

app.listen(port, (req, res)=>{
    console.log("The is listening on Port: " + port);
})