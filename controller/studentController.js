const db = require('../utils/db-connnection');
const Student = require('../models/students');

const addEntries = async (req, res) => {

    try {
        const { email, name } = req.body;
        const student = await Student.create({
            email: email,
            name: name
        });
        res.status(201).send(`Student with name ${name} has been created!`)
    } catch (error) {
        console.log(error);
        res.status(500).send(`Unable to make an entry!`);
    }

    // const insertQuery = 'INSERT INTO students (email, name) VALUES (?,?)';
    // db.execute(insertQuery, [email, name], (err)=>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return;
    //     }
    //     console.log("Values has been inserted ");
    //     res.status(200).send(`Student with name ${name} has been added.`)
    // })
}

const updateEntry =async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const student = await Student.findByPk(id);
        if(!student){
            return res.status(404).send("User not found!");
        }
        student.name = name;
        await student.save();
        res.status(200).send(`User with ID ${id} has been updated.`)
    } catch (error) {
        console.log(error);
        res.status(500).send("User cannot be updated!");
    }

    // const udpateQuery = "UPDATE students set name = ? WHERE id = ?"
    // db.execute(udpateQuery, [name, id], (err, result) =>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return;
    //     }
    //     if(result.affectedRows === 0){
    //         res.status(404).send("Student not found");
    //         return;
    //     }
    //     res.status(200).send(`User has been updated.`)
    // })
}

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.destroy({
            where:{
                id:id
            }
        })
        if(!student){
            return res.status(404).send("User not found!");
        }
        res.status(200).send(`User with ID ${id} has been deleted.`)

    } catch (error) {
        console.log(error);
        res.status(500).send("Error occured while deleting.");
    }



    // const deleteQuery = "DELETE FROM students where id = ?";
    // db.execute(deleteQuery, [id], (err, result) => {
    //     if (err) {
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //     }
    //     if (result.affectedRows === 0) {
    //         res.status(404).send("Student not found");
    //         return;
    //     }
    //     res.status(200).send(`User with ${id} has been deleted.`)
    // })
}

module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
}