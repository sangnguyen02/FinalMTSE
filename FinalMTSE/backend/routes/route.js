const router = require('express').Router();


// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { majorCreate, majorList, deleteMajor, deleteMajors, getMajorDetail, getMajorStudents } = require('../controllers/major-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByMajor,
    updateExamResult,
    clearAllStudentsAttendanceByProject,
    clearAllStudentsAttendance,
    removeStudentAttendanceByProject,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { projectCreate, majorProjects, deleteProjectsByMajor, getProjectDetail, deleteProject, freeProjectList, allProjects, deleteProjects } = require('../controllers/project-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByMajor, deleteTeacher, updateTeacherProject, teacherAttendance } = require('../controllers/teacher-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
const {googleOauthHandler}=require('../controllers/auth-controller.js');
router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)
router.get("/api/v1/users/oauth/google",googleOauthHandler);
// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsMajor/:id", deleteStudentsByMajor)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsProjectAtten/:id', clearAllStudentsAttendanceByProject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentProjectAtten/:id', removeStudentAttendanceByProject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersMajor/:id", deleteTeachersByMajor)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherProject", updateTeacherProject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Major

router.post('/MajorCreate', majorCreate);

router.get('/MajorList/:id', majorList);
router.get("/Major/:id", getMajorDetail)

router.get("/Major/Students/:id", getMajorStudents)

router.delete("/Majors/:id", deleteMajors)
router.delete("/Major/:id", deleteMajor)

// Project

router.post('/ProjectCreate', projectCreate);

router.get('/AllProjects/:id', allProjects);
router.get('/MajorProjects/:id', majorProjects);
router.get('/FreeProjectList/:id', freeProjectList);
router.get("/Project/:id", getProjectDetail)

router.delete("/Project/:id", deleteProject)
router.delete("/Projects/:id", deleteProjects)
router.delete("/ProjectsMajor/:id", deleteProjectsByMajor)

module.exports = router;