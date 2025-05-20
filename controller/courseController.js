const Course = require('../models/courses');
const Student = require('../models/students');

const addCourse = async (req, res) =>{
    try {
        const{name} = req.body;
        const course = await Course.create({'name': name})
        res.status(201 ).json(course);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const addStudentsToCourses = async (req, res) =>{

// Payload will have something like this 
// {
//   "studentId": 1,
//   "courseIds": [1, 2]
// }

    try {
        const {studentId, courseIds} = req.body;
        const student = await Student.findByPk(studentId);
        const course = await Course.findAll({
            where: {
                id: courseIds
            }
        })

        await student.addCourses(course);

        const udpatedStudent = await Student.findByPk(studentId, {include: Course});
        res.status(200).json(udpatedStudent);

    } catch (error) {
        
    }
}

module.exports = {
    addCourse,
    addStudentsToCourses
}