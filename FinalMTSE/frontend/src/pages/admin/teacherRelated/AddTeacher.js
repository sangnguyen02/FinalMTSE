import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMajorDetailsAddTeacher } from '../../../redux/majorRelated/majorHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const majorID = params.majorID;
  console.log(majorID)

  const { status, response, error } = useSelector(state => state.user);
  const { majorDetailsAddTeacher } = useSelector((state) => state.major);

  

  useEffect(() => {
    console.log("run")
    dispatch(getMajorDetailsAddTeacher(majorID, "Major"));
  }, [dispatch, majorID]);

  console.log(majorDetailsAddTeacher)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isHoD, setIsHoD] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = majorDetailsAddTeacher?.data && majorDetailsAddTeacher?.data.school._id
  const teachMajor = majorDetailsAddTeacher?.data && majorDetailsAddTeacher?.data._id

  const fields = { name, email, password, role, school, teachMajor, isHoD }
  console.log(fields)

  const submitHandler = (event) => {
    event.preventDefault()
    console.log("isHoD value before dispatch:", isHoD);
    setLoader(true)
    dispatch(registerUser(fields, role))
    console.log("isHoD value after dispatch:", isHoD);
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
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
    <div>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Teacher</span>
          <br />
          <label>
            Major : {majorDetailsAddTeacher?.data.majorName}
          </label>
          <label>Name</label>
          <input className="registerInput" type="text" placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name" required />

          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />

          <label style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '5px' }}>Head of Department:</span>
            <input
              type="checkbox"
              checked={isHoD}
              onChange={() => setIsHoD((prev) => !prev)}
            />
          </label>

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default AddTeacher