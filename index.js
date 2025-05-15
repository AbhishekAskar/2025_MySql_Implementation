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

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Connection has been created");

    const tables = [
    `CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20)
    )`,
    `CREATE TABLE IF NOT EXISTS Buses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        busNumber INT,
        totalSeats INT,
        availableSeats INT
    )`,
    `CREATE TABLE IF NOT EXISTS Bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seatNumbers INT
    )`,
    `CREATE TABLE IF NOT EXISTS Payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amountPaid INT,
        paymentStatus VARCHAR(20)
    )`
];


    tables.forEach((query) => {
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query:", err.message);
        } else {
            console.log("Table created successfully.");
        }
    });
});

})

app.get('/', (req, res) => {
    res.send("Hello Abhishek")
})

app.listen(port, (req, res) => {
    console.log("The is listening on Port: " + port);
})