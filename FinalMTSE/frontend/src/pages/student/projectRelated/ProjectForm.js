import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { getStudentsSameMajor } from '../../../redux/studentRelated/studentHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const ProjectForm = () => {
    const [projects, setProjects] = useState([{ projectName: "", projectCode: "", sessions: "", description: ""}]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { majorID: majorId } = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const [studentName, setStudentName] = useState('')
    const [sstudentName, setSstudentName] = useState('')
    const { studentsMajorList } = useSelector((state) => state.student);
    const studentID = currentUser._id
    const address = "Project"
    const adminID = currentUser.school._id
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const [projectName, setProjectName] = useState('');
    const [projectCode, setProjectCode] = useState('');
    const [sessions, setProjectSession] = useState('');
    const [description, setProjectDescription] = useState('');
    const majorName = majorId

    
    

    useEffect(() => {
        dispatch(getStudentsSameMajor(majorId));
    }, [majorId, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Member') {
            setStudentName('Select Member');
            setSstudentName('');
        } else {
            const selectedMember = studentsMajorList.find(
                (studentItem) => studentItem._id === event.target.value
            );
            setStudentName(selectedMember._id);
            setSstudentName(selectedMember._id);
        }
    }

    const currentUserID = currentUser._id;
    const selectedMemberID = studentName;
    const students = [{"student":currentUserID}, {"student":selectedMemberID}]
    const fields = {
        projectName,
        projectCode,
        sessions,
        description,
        students,
        majorName,
        adminID,
    };

    



    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        if (currentUserID === selectedMemberID) {
            // currentUser._id is equal to studentName
            setLoader(false)
            setMessage("You cannot add yourself as a member")
            setShowPopup(true)
        } else if(selectedMemberID === "") {
            setLoader(false)
            setMessage("Please select your member")
            setShowPopup(true)
        } else {
            console.log(fields)
            dispatch(addStuff(fields, address))
        }
        
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Student/projects");
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
    <>
        <div className="register">
            <form className="registerForm" onSubmit={submitHandler}>
                <span className="registerTitle">Register Project</span>
                <label>Project Name</label>
                <input className="registerInput" type="text" placeholder="Enter student's name..."
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    autoComplete="name" required />

                <label>Your member</label>
                    <select
                        className="registerInput"
                        value={studentName}
                        onChange={changeHandler} required>
                        <option value='Select Member'>Select Member</option>
                        {studentsMajorList.map((studentItem) => (
                            <option key={studentItem._id} value={studentItem._id}>
                                {studentItem.studentID}
                            </option>
                        ))}
                    </select>

                <label>Project Code</label>
                <input className="registerInput" type="text" placeholder="Enter student's Roll Number..."
                    value={projectCode}
                    onChange={(event) => setProjectCode(event.target.value)}
                    required />
                
                <label>Project Session</label>
                <input className="registerInput" type="text" placeholder="Enter student's email..."
                value={sessions}
                onChange={(event) => setProjectSession(event.target.value)}
                required />

                <label>Project Description</label>
                <input className="registerInput" type="text" placeholder="Enter student's name..."
                    value={description}
                    onChange={(event) => setProjectDescription(event.target.value)}
                    autoComplete="name" required />

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
            </form>
        </div>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
)
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