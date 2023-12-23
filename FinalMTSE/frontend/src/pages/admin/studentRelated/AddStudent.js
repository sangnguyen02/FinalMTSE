import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllMajors } from '../../../redux/majorRelated/majorHandle';
import { CircularProgress } from '@mui/material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { majorsList } = useSelector((state) => state.major);

    const [name, setName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [majorName, setMajorName] = useState('')
    const [smajorName, setSmajorName] = useState('')
    const [DoB, setDoB] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Major") {
            setSmajorName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllMajors(adminID, "Major"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Major') {
            setMajorName('Select Major');
            setSmajorName('');
        } else {
            const selectedMajor = majorsList.find(
                (majorItem) => majorItem.majorName === event.target.value
            );
            setMajorName(selectedMajor._id);
            setSmajorName(selectedMajor.majorName);
        }
    }

    const fields = { name, studentID, email, password, majorName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (majorName === "") {
            setMessage("Please select a majorname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
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
                    <span className="registerTitle">Add Student</span>
                    <label>Name</label>
                    <input className="registerInput" type="text" placeholder="Enter student's name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name" required />

                    {
                        situation === "Student" &&
                        <>
                            <label>Major</label>
                            <select
                                className="registerInput"
                                value={majorName}
                                onChange={changeHandler} required>
                                <option value='Select Major'>Select Major</option>
                                {majorsList.map((majorItem, index) => (
                                    <option key={index} value={majorItem.majorName}>
                                        {majorItem.majorName}
                                    </option>
                                ))}
                            </select>
                        </>
                    }

                    <label>Student ID</label>
                    <input className="registerInput" type="text" placeholder="Enter student's Roll Number..."
                        value={studentID}
                        onChange={(event) => setStudentID(event.target.value)}
                        required />
                    
                    <label>Email</label>
                    <input className="registerInput" type="text" placeholder="Enter student's email..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required />

                    <label>Password</label>
                    <input className="registerInput" type="password" placeholder="Enter student's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password" required />

                    <button className="registerButton" type="submit" disabled={loader}>
                        {loader ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Add'
                        )}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent