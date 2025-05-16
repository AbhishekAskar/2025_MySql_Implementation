const db = require('../utils/db-connnection');

const addEntries = (req, res) =>{
    const {email, name} = req.body;
    const insertQuery = 'INSERT INTO students (email, name) VALUES (?,?)';
    db.execute(insertQuery, [email, name], (err)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        console.log("Values has been inserted ");
        res.status(200).send(`Student with name ${name} has been added.`)
    })
}

const updateEntry = (req, res) =>{
    const {id} = req.params;
    const {name} = req.body;
    const udpateQuery = "UPDATE students set name = ? WHERE id = ?"
    db.execute(udpateQuery, [name, id], (err, result) =>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).send("Student not found");
            return;
        }
        res.status(200).send(`User has been updated.`)
    })
}

const deleteEntry = (req, res) =>{
    const {id} = req.params;
    const deleteQuery = "DELETE FROM students where id = ?";
    db.execute(deleteQuery, [id], (err, result) =>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
        }
        if(result.affectedRows === 0){
            res.status(404).send("Student not found");
            return;
        }
        res.status(200).send(`User with ${id} has been deleted.`)
    })
}

module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
}