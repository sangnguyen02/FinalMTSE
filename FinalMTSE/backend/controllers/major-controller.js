const Major = require('../models/majorSchema.js');
const Student = require('../models/studentSchema.js');
const Project = require('../models/projectSchema.js');
const Teacher = require('../models/teacherSchema.js');

const majorCreate = async (req, res) => {
    try {
        const major = new Major({
            majorName: req.body.majorName,
            school: req.body.adminID
        });

        const existingMajorByName = await Major.findOne({
            majorName: req.body.majorName,
            school: req.body.adminID
        });

        if (existingMajorByName) {
            res.send({ message: 'Sorry this major name already exists' });
        }
        else {
            const result = await major.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const majorList = async (req, res) => {
    try {
        let majors = await Major.find({ school: req.params.id })
        if (majors.length > 0) {
            res.send(majors)
        } else {
            res.send({ message: "No majors found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getMajorDetail = async (req, res) => {
    try {
        let major = await Major.findById(req.params.id);
        if (major) {
            major = await major.populate("school", "schoolName")
            res.send(major);
        }
        else {
            res.send({ message: "No major found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getMajorStudents = async (req, res) => {
    try {
        let students = await Student.find({ majorName: req.params.id })
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteMajor = async (req, res) => {
    try {
        const deletedMajor = await Major.findByIdAndDelete(req.params.id);
        if (!deletedMajor) {
            return res.send({ message: "Major not found" });
        }
        const deletedStudents = await Student.deleteMany({ majorName: req.params.id });
        const deletedProjects = await Project.deleteMany({ majorName: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ teachMajor: req.params.id });
        res.send(deletedMajor);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteMajors = async (req, res) => {
    try {
        const deletedMajors = await Major.deleteMany({ school: req.params.id });
        if (deletedMajors.deletedCount === 0) {
            return res.send({ message: "No majors found to delete" });
        }
        const deletedStudents = await Student.deleteMany({ school: req.params.id });
        const deletedProjects = await Project.deleteMany({ school: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
        res.send(deletedMajors);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { majorCreate, majorList, deleteMajor, deleteMajors, getMajorDetail, getMajorStudents };