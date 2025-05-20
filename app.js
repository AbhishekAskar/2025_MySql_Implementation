const express = require('express');
const db = require('./utils/db-connnection');
const studentRoutes = require('./routes/studentsRoutes');
const courseRoutes = require('./routes/courseRoutes')

//models
const studentModels = require('./models/students');
require('./models')

const app = express();
let port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello Abhishek");
})

app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);

db.sync({forced: true}).then(()=>{
    app.listen(port, (req, res) => {
        console.log("The is listening on Port: " + port);
    })
}).catch((error)=>{ 
    console.log(error);
})

