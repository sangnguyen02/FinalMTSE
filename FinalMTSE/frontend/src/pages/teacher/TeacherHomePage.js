import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Projects from "../../assets/img4.png";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getMajorStudents, getProjectDetails } from '../../redux/majorRelated/majorHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { projectLists, majorStudents } = useSelector((state) => state.major);

    const majorID = currentUser.teachMajor?._id
    const projectID = currentUser.teachProject?._id

    useEffect(() => {
        dispatch(getProjectDetails(projectID, "Project"));
        dispatch(getMajorStudents(majorID));
    }, [dispatch, projectID, majorID]);

    const numberOfStudents = majorStudents && majorStudents.length;
    const numberOfProjects = projectLists && projectLists.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Students} alt="Students" />
                            <Title>
                                Major Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Projects} alt="Projects" />
                            <Title>
                                Total Projects
                            </Title>
                            <Data start={0} end={numberOfProjects} duration={5} />
                        </StyledPaper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default TeacherHomePage