import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getSuccessIsNotHoD,
    getFailed,
    getError,
    postDone,
    doneSuccess
} from './teacherSlice';

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getAllTeachersIsNotHoD = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/teachersNotHoD`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccessIsNotHoD(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teacher/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateTeachProject = (teacherId, teachProject) => async (dispatch) => {
    dispatch(getRequest());

    try {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/TeacherProject`, { teacherId, teachProject }, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error));
    }
}