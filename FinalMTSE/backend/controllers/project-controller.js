const Project = require('../models/projectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');
const setPDF = (req, res, next) => {
    if (req.files) {
      const media = req.files.map((file) => ({ filePath: file.filename }));
      req.body.submissions = media;
    } else if (req.file) {
      const media = { filePath: req.file.filename };
      req.body.submissions = media;
    }
    next();
  };
const projectCreate = async (req, res) => {
    try {
        const data = req.body;
        if(data) {
            const project = await Project.create(data)
            res.status(200).send(project);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const allProjects = async (req, res) => {
    try {
        let projects = await Project.find({ school: req.params.id })
            .populate("majorName", "majorName")
        if (projects.length > 0) {
            res.send(projects)
        } else {
            res.send({ message: "No projects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProjectByStudent = async (req, res) => {
    try {
        let projects = await Project.find({ "students.student": req.params.studentId })
            .populate("majorName", "majorName")
            .populate("teacher", "teacherName")

        if (projects.length > 0) {
            res.send(projects)
        } else {
            res.send({ message: "No projects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const majorProjects = async (req, res) => {
    try {
        let projects = await Project.find({ majorName: req.params.id })
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
        let projects = await Project.find({ majorName: req.params.id, teacher: { $exists: false } });
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
            project = await project.populate("majorName", "majorName")
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

const getProjectByTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;
        console.log(teacherId)

        const projects = await Project.find({ teacher: teacherId })
            .populate("majorName", "majorName")
            .populate("school", "schoolName")
            .populate("teacher", "name");
        console.log("Projects:", projects);

        if (projects.length > 0) {
            res.send(projects);
        } else {
            res.send({ message: "No projects found for the specified teacher" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProjectDetailByTeacher = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (project) {
            project = await project.populate("majorName", "majorName")
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

const getTotalProjectByTeacher = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments({ teacher: req.params.id });
        res.status(200).json({ totalProjects });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Request Error' });
    }
};

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

const deleteProjectsByMajor = async (req, res) => {
    try {
        const deletedProjects = await Project.deleteMany({ majorName: req.params.id });

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
const uploadProject = async (req, res) => {
    try {
        const projectID = req.params.id
        const data = req.body;
        if(data) {
            const project = await Project.findByIdAndUpdate(projectID, data, {
                new: true,
                runValidators: true
              }
          )
            res.status(200).send(project);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { projectCreate, freeProjectList, majorProjects, getProjectDetail, getProjectDetailByTeacher, getProjectByTeacher, deleteProjectsByMajor, getProjectByStudent, deleteProjects, deleteProject, allProjects, uploadProject,setPDF, getTotalProjectByTeacher };