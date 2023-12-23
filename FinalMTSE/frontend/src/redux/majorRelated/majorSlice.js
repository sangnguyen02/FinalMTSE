import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    majorsList: [],
    majorStudents: [],
    majorDetails: [],
    projectsList: [],
    projectDetails: [],
    loading: false,
    subloading: false,
    error: null,
    response: null,
    getresponse: null,
};

const majorSlice = createSlice({
    name: 'major',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getProjectDetailsRequest: (state) => {
            state.subloading = true;
        },
        getSuccess: (state, action) => {
            state.majorsList = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = null;
        },
        getStudentsSuccess: (state, action) => {
            state.majorStudents = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = null;
        },
        getProjectsSuccess: (state, action) => {
            state.projectsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getProjectsByTeacherSuccess: (state, action) => {
            state.projectsListByTeacher = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.projectsList = [];
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFailedTwo: (state, action) => {
            state.majorsList = [];
            state.majorStudents = [];
            state.getresponse = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        detailsSuccess: (state, action) => {
            state.majorDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        getProjectDetailsSuccess: (state, action) => {
            state.projectDetails = action.payload;
            state.subloading = false;
            state.error = null;
        },
        resetProjects: (state) => {
            state.projectsList = [];
            state.majorsList = [];
        },
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    getProjectsSuccess,
    getProjectsByTeacherSuccess,
    detailsSuccess,
    getFailedTwo,
    resetProjects,
    getProjectDetailsSuccess,
    getProjectDetailsRequest
} = majorSlice.actions;

export const majorReducer = majorSlice.reducer;