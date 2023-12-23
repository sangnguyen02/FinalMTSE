import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getProjectListByTeacher } from '../../../src/redux/majorRelated/majorHandle';
import { deleteUser } from '../../../src/redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../src/components/TableTemplate';
import { BlueButton, GreenButton } from '../../../src/components/buttonStyles';
import SpeedDialTemplate from '../../../src/components/SpeedDialTemplate';
import Popup from '../../../src/components/Popup';

const TeacherProjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { projectsListByTeacher, loading, error, response } = useSelector((state) => state.major);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getProjectListByTeacher(currentUser._id, "Teacher"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)

        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getProjectList(currentUser._id, "AllProjects"));
        //     })
    }

    const projectColumns = [
        { id: 'projectName', label: 'Project Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'majorName', label: 'Major', minWidth: 170 },
    ]

    // const projectRows = projectList.map((project) => {
    //     return {
    //         projectName: project.projectName,
    //         sessions: project.sessions,
    //         majorName: project.majorName.majorName,
    //         majorID: project.majorName._id,
    //         id: project._id,
    //     };
    // })
    console.log(projectsListByTeacher)
    const projectRows = projectsListByTeacher ? (
        projectsListByTeacher.map((project) => ({
          projectName: project.teachProject.projectName,
          sessions: project.teachProject.sessions,
          majorName: project.teachMajor.majorName,
          majorID: project.teachMajor._id,
          id: project._id,
        }))
      ) : [];

    const ProjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Project")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/projects/project/${row.majorID}/${row.id}`)}>
                    View
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Project',
            action: () => navigate("/Admin/projects/choosemajor")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Projects',
            action: () => deleteHandler(currentUser._id, "Projects")
        }
    ];

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/projects/choosemajor")}>
                                Add Project
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(projectsListByTeacher) && projectsListByTeacher.length > 0 &&
                                <TableTemplate buttonHaver={ProjectsButtonHaver} columns={projectColumns} rows={projectRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

        </>
    );
};

export default TeacherProjects;