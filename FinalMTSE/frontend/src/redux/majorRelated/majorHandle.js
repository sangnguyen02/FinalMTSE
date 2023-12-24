import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    getProjectsSuccessTeacher,
    getStudentsSuccessByTeacher,
    getProjectsByTeacherSuccess,
    getProjectDetailsByTeacherSuccess,
    detailsSuccess,
    detailsSuccessAddTeacher,
    getFailedTwo,
    getProjectsSuccess,
    getProjectDetailsSuccess,
    getProjectDetailsRequest
} from './majorSlice';

export const getAllMajors = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getMajorStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Major/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getStudentsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getMajorStudentsByTeacher = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Major/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getStudentsSuccessByTeacher(result.data));
            console.log("data", result.data)
            
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getMajorDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getMajorDetailsAddTeacher = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        console.log("result", result)
        if (result) {
            dispatch(detailsSuccessAddTeacher(result));
            
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getProjectList = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getProjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getProjectListByTeacher = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getProjectsByTeacherSuccess([result.data]));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getTeacherFreeMajorProjects = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/FreeProjectList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getProjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getTeacherFreeMajorProjectsTeacher = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/FreeProjectList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getProjectsSuccessTeacher(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getProjectDetails = (id, address) => async (dispatch) => {
    dispatch(getProjectDetailsRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(getProjectDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getProjectDetailsByTeacher = (id, address) => async (dispatch) => {
    dispatch(getProjectDetailsRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        console.log(result.data)
        if (result.data) {
            dispatch(getProjectDetailsByTeacherSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}