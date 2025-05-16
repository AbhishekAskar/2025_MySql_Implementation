const mysql = require('mysql2');

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

    const creationQuery = `CREATE TABLE IF NOT EXISTS Students (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(20),
         email VARCHAR(20)
    )`
    
    connection.execute(creationQuery, (err, result) => {
        if (err) {
            console.error("Error executing query:", err.message);
        } else {
            console.log("Table created successfully.");
        }
    });

})

module.exports = connection;
