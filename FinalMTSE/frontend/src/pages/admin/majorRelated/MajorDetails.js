import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getMajorDetails, getMajorStudents, getProjectList } from "../../../redux/majorRelated/majorHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetProjects } from "../../../redux/majorRelated/majorSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const MajorDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { projectsList, majorStudents, majorDetails, loading, error, response, getresponse } = useSelector((state) => state.major);

    const majorID = params.id

    useEffect(() => {
        dispatch(getMajorDetails(majorID, "Major"));
        dispatch(getProjectList(majorID, "MajorProjects"))
        dispatch(getMajorStudents(majorID));
    }, [dispatch, majorID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getMajorStudents(majorID));
        //         dispatch(resetProjects())
        //         dispatch(getProjectList(majorID, "MajorProjects"))
        //     })
    }

    const projectColumns = [
        { id: 'name', label: 'Project Name', minWidth: 170 },
        { id: 'code', label: 'Project Code', minWidth: 100 },
    ]

    const projectRows = projectsList && projectsList.length > 0 && projectsList.map((project) => {
        return {
            name: project.projectName,
            code: project.projectCode,
            id: project._id,
        };
    })

    const ProjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Project")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/major/project/${majorID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </>
        );
    };

    const projectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Project',
            action: () => navigate("/Admin/addproject/" + majorID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Projects',
            action: () => deleteHandler(majorID, "ProjectsMajor")
        }
    ];

    const MajorProjectsSection = () => {
        return (
            <>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addproject/" + majorID)}
                        >
                            Add Projects
                        </GreenButton>
                    </Box>
                    :
                    <>
                        <Typography variant="h5" gutterBottom>
                            Projects List:
                        </Typography>

                        <TableTemplate buttonHaver={ProjectsButtonHaver} columns={projectColumns} rows={projectRows} />
                        <SpeedDialTemplate actions={projectActions} />
                    </>
                }
            </>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = majorStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Admin/students/student/attendance/" + row.id)
                    }
                >
                    Attendance
                </PurpleButton>
            </>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/major/addstudents/" + majorID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(majorID, "StudentsMajor")
        },
    ];

    const MajorStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/major/addstudents/" + majorID)}
                            >
                                Add Students
                            </GreenButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Students List:
                        </Typography>

                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </>
        )
    }

    const MajorTeachersSection = () => {
        return (
            <>
                Teachers
            </>
        )
    }

    const MajorDetailsSection = () => {
        const numberOfProjects = projectsList.length;
        const numberOfStudents = majorStudents.length;

        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Major Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    This is Major {majorDetails && majorDetails.majorName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Number of Projects: {numberOfProjects}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Number of Students: {numberOfStudents}
                </Typography>
                {getresponse &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/major/addstudents/" + majorID)}
                    >
                        Add Students
                    </GreenButton>
                }
                {response &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addproject/" + majorID)}
                    >
                        Add Projects
                    </GreenButton>
                }
            </>
        );
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    <Tab label="Projects" value="2" />
                                    <Tab label="Students" value="3" />
                                    <Tab label="Teachers" value="4" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <MajorDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <MajorProjectsSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <MajorStudentsSection />
                                </TabPanel>
                                <TabPanel value="4">
                                    <MajorTeachersSection />
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default MajorDetails;