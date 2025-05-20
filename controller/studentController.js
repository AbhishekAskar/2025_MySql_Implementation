const db = require('../utils/db-connnection');
const Student = require('../models/students');
const IdentityCard = require('../models/identityCard');
const Department = require('../models/department');

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
}

const addingValuesToStudentAndIdentityTable = async (req, res) =>{

// CREATE : creates a new entry in the database inside the table called students
// .student : data from the body is stored under a Key called 'student'
// This will be the Payload(data sent from the frontend) for the request
// "student" : {"name": "Abhishek"},
// "identityCard" : {"cardNumber": "123456789"}
// so from the above payload using '.student' the backend will retrieve the data in the 'student' key for student
// and same with the identityCard as well

    try {
        const student = await Student.create(req.body.student);
        const idCard = await IdentityCard.create({
            ...req.body.IdentityCard,
            studentId: student.id
        });
        res.status(201).json({student, idCard});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const addingDepartmentForStudents = async (req, res) => {
    try {
        const { name } = req.body.department;

        // Check if department already exists
        let department = await Department.findOne({ where: { name } });

        // If it doesn't exist, create a new one
        if (!department) {
            department = await Department.create({ name });
        }

        const student = await Student.create({
            ...req.body.student,
            departmentId: department.id 
        })
        res.status(201).json({department, student});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
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
}

module.exports = {
    addEntries,
    updateEntry,
    deleteEntry,
    addingValuesToStudentAndIdentityTable,
    addingDepartmentForStudents
}