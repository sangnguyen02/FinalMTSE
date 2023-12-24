import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio  } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getUserDetails, updateUserStudent } from '../../../src/redux/userRelated/userHandle';
import { StyledTableCell, StyledTableRow } from '../../../src/components/styles';
const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const params = useParams()
  const dispatch = useDispatch()
  const studentID = currentUser._id
  const Address = "Student"
  const major = currentUser.majorName
  const school = currentUser.school

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [majorName, setMajorName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    dispatch(getUserDetails(studentID, Address));
}, [dispatch, studentID])


const handleEditClick = () => {
  setEditMode(true);
};

const handleCancelEdit = () => {
  setEditMode(false);
};


const submitHandler = (event) => {
  const fields = password === ""
        ? { name, phone, address, gender }
        : { name, phone, address, gender, password }
  console.log(fields)
  event.preventDefault()
  dispatch(updateUserStudent(fields, studentID, Address))
      .then(() => {
          setEditMode(false);
          dispatch(getUserDetails(studentID, Address));
      })
      .catch((error) => {
          console.error(error)
      })
}

if (response) { console.log(response) }
else if (error) { console.log(error) }

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Student ID: {currentUser.studentID}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Major: {major.majorName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  School: {school.schoolName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
        <Box display="flex" flexDirection="row">
          {editMode ? (
              <Button variant="contained" color="secondary" onClick={handleCancelEdit}>
              Cancel Edit
              </Button>
          ) : (
              <Button variant="contained"  color="primary" onClick={handleEditClick}>
              Edit
              </Button>
          )}
        </Box>

        <br/>
        {editMode && (
            <Grid item xs={12}>
                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <span className="registerTitle">Edit Details</span>
                        <label>Name</label>
                        <input className="registerInput" type="text" placeholder="Enter user's name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Male"
                                name="radio-buttons-group"
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>

                        <label>Student Phone</label>
                        <input className="registerInput" type="text" placeholder="Enter user's phone..."
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required />


                        <label>Student Address</label>
                        <input className="registerInput" type="text" placeholder="Enter user's address..."
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required />

                        <label>Password</label>
                        <input className="registerInput" type="password" placeholder="Enter user's password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" />

                        <button className="registerButton" type="submit" >Update</button>
                    </form>
                </div>
            </Grid>
          )}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Gender:</strong> {currentUser.gender}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Email:</strong> {currentUser.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Phone:</strong> {currentUser.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Address:</strong> {currentUser.address}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default StudentProfile

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;