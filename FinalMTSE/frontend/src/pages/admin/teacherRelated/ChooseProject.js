import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassProjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachProject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ChooseProject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { projectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id
            dispatch(getTeacherFreeClassProjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassProjects(classID));
        }
    }, [situation]);

    if (loading) {
        return <div>Loading...</div>;
    } else if (response) {
        return <div>
            <h1>Sorry all projects have teachers assigned already</h1>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <PurpleButton variant="contained"
                    onClick={() => navigate("/Admin/addproject/" + classID)}>
                    Add Projects
                </PurpleButton>
            </Box>
        </div>;
    } else if (error) {
        console.log(error)
    }

    const updateProjectHandler = (teacherId, teachProject) => {
        setLoader(true)
        dispatch(updateTeachProject(teacherId, teachProject))
        navigate("/Admin/teachers")
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom component="div">
                Choose a project
            </Typography>
            <>
                <TableContainer>
                    <Table aria-label="sclasses table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="center">Project Name</StyledTableCell>
                                <StyledTableCell align="center">Project Code</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(projectsList) && projectsList.length > 0 && projectsList.map((project, index) => (
                                <StyledTableRow key={project._id}>
                                    <StyledTableCell component="th" scope="row" style={{ color: "white" }}>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{project.projectName}</StyledTableCell>
                                    <StyledTableCell align="center">{project.projectCode}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {situation === "Norm" ?
                                            <GreenButton variant="contained"
                                                onClick={() => navigate("/Admin/teachers/addteacher/" + project._id)}>
                                                Choose
                                            </GreenButton>
                                            :
                                            <GreenButton variant="contained" disabled={loader}
                                                onClick={() => updateProjectHandler(teacherID, project._id)}>
                                                {loader ? (
                                                    <div className="load"></div>
                                                ) : (
                                                    'Choose Project'
                                                )}
                                            </GreenButton>}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </Paper >
    );
};

export default ChooseProject;