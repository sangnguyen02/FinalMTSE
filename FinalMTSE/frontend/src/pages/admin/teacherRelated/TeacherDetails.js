import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isProjectNamePresent = teacherDetails?.teachProject?.projectName;

    const handleAddProject = () => {
        navigate(`/Admin/teachers/chooseproject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Teacher Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Teacher Name: {teacherDetails?.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Class Name: {teacherDetails?.teachSclass?.sclassName}
                    </Typography>
                    {isProjectNamePresent ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Project Name: {teacherDetails?.teachProject?.projectName}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Project Sessions: {teacherDetails?.teachProject?.sessions}
                            </Typography>
                        </>
                    ) : (
                        <Button variant="contained" onClick={handleAddProject}>
                            Add Project
                        </Button>
                    )}
                </Container>
            )}
        </>
    );
};

export default TeacherDetails;