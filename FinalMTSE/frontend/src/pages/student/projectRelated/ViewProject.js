import React, { useEffect, useState, useRef } from 'react'
import { getMajorStudents, getProjectDetails, submitFilePDF } from '../../../redux/majorRelated/majorHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewProject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, projectDetails, majorStudents, getresponse, error } = useSelector((state) => state.major);

  const { majorID, projectID } = params

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    dispatch(getProjectDetails(projectID, "Project"));
    dispatch(getMajorStudents(majorID));
  }, [dispatch, projectID, majorID]);

  const [fileSubmit, setFileSubmit] = useState({"report":File})

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'studentID', label: 'StudentID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ]
  console.log(projectDetails)

  const studentRows = majorStudents.map((student) => {
    return {
      studentID: student.studentID,
      name: student.name,
      id: student._id,
    };
  })

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        
      </>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <>
        
      </>
    );
  };

  const ProjectDetailsSection = () => {

    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Project Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Project Name : {projectDetails.projectName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Project Code : {projectDetails && projectDetails.projectCode}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Project Sessions : {projectDetails && projectDetails.sessions}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Project Description : {projectDetails && projectDetails.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Major Name : {projectDetails && projectDetails.majorName && projectDetails.majorName.majorName}
        </Typography>
      </>
    );
  }


  
  const Submission = () => {
    const fileInputRef = useRef();
    const handleClickSelectFile = () => {
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
    };

    const handleClickSubmit =async () => {
      console.log("run")
      console.log(fileSubmit)
      
      // dispatch(submitFilePDF(projectID, "Student", fileSubmit))
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/Student/projects/${projectID}` , fileSubmit,{ headers: {
        'Content-Type': 'multipart/form-data'
        }},
      ).then(res => {

        console.log(res)
      }).catch(error => {
        console.log(error)
      })
      
    };

    const handleFileChange = (event) => {
      const selectedFile = event.target.files && event.target.files[0];
      let { name, value } = event.target;
      name = "report"
      setFileSubmit((prevFormDataPost) => ({
          ...prevFormDataPost, [name]: selectedFile,
      }));

   
    };
    
    return (
      <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        />
      
      <BlueButton variant="contained"
          onClick={handleClickSelectFile}>
          Upload
      </BlueButton> 

      <BlueButton variant="contained"
          onClick={handleClickSubmit}>
          Submit
      </BlueButton>

      <Typography variant="h4" align="center" gutterBottom>
          File: {fileSubmit.report.name}
      </Typography>

      <a  href={`http://localhost:5000/uploads/${projectDetails.submissions[0].filePath}`} 
          target="_blank" 
          rel="noopener noreferrer">
          File Name: {projectDetails.submissions[0].filePath}
      </a>
      
      
      <br />
      <Typography variant="h7" align="center" gutterBottom>
          Lasted upload date: {formatDate(projectDetails.submissions[0].submissionDate)}
      </Typography>
      


      </>
    );
  }

  return (
    <>
      {subloading ?
        < div > Loading...</div >
        :
        <>
          <Box sx={{ width: '100%', typography: 'body1', }} >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                  <Tab label="Details" value="1" />
                  <Tab label="Submission" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <ProjectDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <Submission />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      }
    </>
  )
}

export default ViewProject