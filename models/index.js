//this is the file for creating associations between two tables(student and identityCard)
const Student = require('./students');
const IdentityCard = require('./identityCard');
const department = require('./department');
const courses = require('./courses');
const studentCourses = require('./studentCourses');

// One to One
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

// One to Many
department.hasMany(Student);
Student.belongsTo(department);

// Many to Many association
Student.belongsToMany(courses, {through: studentCourses});
courses.belongsToMany(Student, {through: studentCourses});

module.exports = {
    Student, 
    IdentityCard,
    department,
    courses,
    studentCourses
}