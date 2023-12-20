const Project = require('../models/projectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');

const projectCreate = async (req, res) => {
    try {
        const projects = req.body.projects.map((project) => ({
            projectName: project.projectName,
            projectCode: project.projectCode,
            sessions: project.sessions,
        }));

        const existingProjectByProjectCode = await Project.findOne({
            'projects.proCode': projects[0].projectCode,
            school: req.body.adminID,
        });

        if (existingProjectByProjectCode) {
            res.send({ message: 'Sorry this project code must be unique as it already exists' });
        } else {
            const newProjects = projects.map((project) => ({
                ...project,
                sclassName: req.body.sclassName,
                school: req.body.adminID,
            }));

            const result = await Project.insertMany(newProjects);
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const allProjects = async (req, res) => {
    try {
        let projects = await Project.find({ school: req.params.id })
            .populate("sclassName", "sclassName")
        if (projects.length > 0) {
            res.send(projects)
        } else {
            res.send({ message: "No projects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const classProjects = async (req, res) => {
    try {
        let projects = await Project.find({ sclassName: req.params.id })
        if (projects.length > 0) {
            res.send(projects)
        } else {
            res.send({ message: "No projects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const freeProjectList = async (req, res) => {
    try {
        let projects = await Project.find({ sclassName: req.params.id, teacher: { $exists: false } });
        if (projects.length > 0) {
            res.send(projects);
        } else {
            res.send({ message: "No projects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProjectDetail = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (project) {
            project = await project.populate("sclassName", "sclassName")
            project = await project.populate("teacher", "name")
            res.send(project);
        }
        else {
            res.send({ message: "No project found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        // Set the teachProject field to null in teachers
        await Teacher.updateOne(
            { teachProject: deletedProject._id },
            { $unset: { teachProject: "" }, $unset: { teachProject: null } }
        );

        // Remove the objects containing the deleted Project from students' examResult array
        await Student.updateMany(
            {},
            { $pull: { examResult: { projectName: deletedProject._id } } }
        );

        // Remove the objects containing the deleted Project from students' attendance array
        await Student.updateMany(
            {},
            { $pull: { attendance: { projectName: deletedProject._id } } }
        );

        res.send(deletedProject);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteProjects = async (req, res) => {
    try {
        const deletedProjects = await Project.deleteMany({ school: req.params.id });

        // Set the teachProject field to null in teachers
        await Teacher.updateMany(
            { teachProject: { $in: deletedProjects.map(project => project._id) } },
            { $unset: { teachProject: "" }, $unset: { teachProject: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedProjects);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteProjectsByClass = async (req, res) => {
    try {
        const deletedProjects = await Project.deleteMany({ sclassName: req.params.id });

        // Set the teachProject field to null in teachers
        await Teacher.updateMany(
            { teachProject: { $in: deletedProjects.map(project => project._id) } },
            { $unset: { teachProject: "" }, $unset: { teachProject: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedProjects);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { projectCreate, freeProjectList, classProjects, getProjectDetail, deleteProjectsByClass, deleteProjects, deleteProject, allProjects };