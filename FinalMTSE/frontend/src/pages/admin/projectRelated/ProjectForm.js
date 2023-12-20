import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const ProjectForm = () => {
    const [projects, setProjects] = useState([{ projectName: "", projectCode: "", sessions: "" }]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id
    const adminID = currentUser._id
    const address = "Project"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleProjectNameChange = (index) => (event) => {
        const newProjects = [...projects];
        newProjects[index].projectName = event.target.value;
        setProjects(newProjects);
    };

    const handleProjectCodeChange = (index) => (event) => {
        const newProjects = [...projects];
        newProjects[index].projectCode = event.target.value;
        setProjects(newProjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newProjects = [...projects];
        newProjects[index].sessions = event.target.value || 0;
        setProjects(newProjects);
    };

    const handleAddProject = () => {
        setProjects([...projects, { projectName: "", projectCode: "" }]);
    };

    const handleRemoveProject = (index) => () => {
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        setProjects(newProjects);
    };

    const fields = {
        sclassName,
        projects: projects.map((project) => ({
            projectName: project.projectName,
            projectCode: project.projectCode,
            sessions: project.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/projects");
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <form onSubmit={submitHandler}>
            <Box mb={2}>
                <Typography variant="h6" >Add Projects</Typography>
            </Box>
            <Grid container spacing={2}>
                {projects.map((project, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Project Name"
                                variant="outlined"
                                value={project.projectName}
                                onChange={handleProjectNameChange(index)}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Project Code"
                                variant="outlined"
                                value={project.projectCode}
                                onChange={handleProjectCodeChange(index)}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Sessions"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={project.sessions}
                                onChange={handleSessionsChange(index)}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" alignItems="flex-end">
                                {index === 0 ? (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleAddProject}
                                    >
                                        Add Project
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleRemoveProject(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" type="submit" disabled={loader}>
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Box>
                </Grid>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Grid>
        </form>
    );
}

export default ProjectForm

const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#838080',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
    },
};