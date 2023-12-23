import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography, // Import Typography
} from '@mui/material';
import { AccountCircle, School, Group, Description as DescriptionIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    // Function to handle navigation based on the selected user type
    if (user === "Admin" && visitor === "guest") {
      const email = "yogendra@12";
      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, user));
    } else if (user === "Student" && visitor === "guest") {
      const rollNum = "1";
      const studentName = "Dipesh Awasthi";
      const fields = { rollNum, studentName, password };
      setLoader(true);
      dispatch(loginUser(fields, user));
    } else if (user === "Teacher" && visitor === "guest") {
      const email = "tony@12";
      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, user));
    } else {
      // Handle navigation to the appropriate login page for each role
      navigate(`/${user.toLowerCase()}login`);
    }
  };

  const downloadFile = (fileName) => {
    const link = document.createElement("a");

    // Set the href attribute to the file path or a data URL
    link.href = `/path/to/your/files/${fileName}`;

    // Set the download attribute with the desired file name
    link.download = fileName;

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
    // Implement file download logic here
  };

  return (
    <StyledContainer>
       <StyledHeader>Guest Instructions</StyledHeader>
      <Grid container spacing={2} justifyContent="center">
        {/* Admin section */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3} onClick={() => navigateHandler("Admin")}>
            <Box mb={2}>
              <AccountCircle fontSize="large" />
            </Box>
            <StyledTypography>
              Admin
            </StyledTypography>
            <p>Login as an administrator. Follow these steps:</p>
            <ul>
              <li>Enter the provided email address.</li>
              <li>Enter the default password.</li>
              <li>Click on the login button.</li>
            </ul>
          </StyledPaper>
        </Grid>

        {/* Student section */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3} onClick={() => navigateHandler("Student")}>
            <Box mb={2}>
              <School fontSize="large" />
            </Box>
            <StyledTypography>
              Student
            </StyledTypography>
            <p>Login as a student. Follow these steps:</p>
            <ul>
              <li>Enter the provided roll number and student name.</li>
              <li>Enter the default password.</li>
              <li>Click on the login button.</li>
            </ul>
          </StyledPaper>
        </Grid>

        {/* Teacher section */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3} onClick={() => navigateHandler("Teacher")}>
            <Box mb={2}>
              <Group fontSize="large" />
            </Box>
            <StyledTypography>
              Teacher
            </StyledTypography>
            <ul>
              <li>Access tho the website</li>
              <li>Enter the provided email address.</li>
              <li>Enter the default password.</li>
              <li>Click on the login button.</li>
            </ul>
          </StyledPaper>
        </Grid>

        {/* Sample Projects section */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper elevation={3}>
            <Box mb={2}>
              <DescriptionIcon fontSize="large" />
            </Box>
            <StyledTypography>
              Sample Projects
            </StyledTypography>
            <p>Download sample projects below:</p>
            <ul>
              <li>
                <a href="#" onClick={() => downloadFile("sample_project_1.docx")}>
                  Sample Project 1
                </a>
              </li>
              <li>
                <a href="#" onClick={() => downloadFile("sample_project_2.docx")}>
                  Sample Project 2
                </a>
              </li>
              <li>
                <a href="#" onClick={() => downloadFile("sample_project_3.docx")}>
                  Sample Project 3
                </a>
              </li>
              {/* Add more sample projects as needed */}
            </ul>
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Loader backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>

      {/* Popup component for displaying messages */}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled(Container)`
 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  &:hover {
    background-color: #2c2c6c;
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;
const StyledHeader = styled.h1`
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;
