import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsList: [],
    studentsMajorList: [],
    studentsProjectList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.studentsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccessStudentsProject: (state, action) => {
            state.studentsProjectList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccessStudentsMajor: (state, action) => {
            state.studentsMajorList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underStudentControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getSuccessStudentsProject,
    getSuccessStudentsMajor,
    getFailed,
    getError,
    underStudentControl,
    stuffDone,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;