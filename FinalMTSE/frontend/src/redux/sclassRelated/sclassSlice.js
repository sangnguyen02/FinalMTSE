import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sclassesList: [],
    sclassStudents: [],
    sclassDetails: [],
    projectsList: [],
    projectDetails: [],
    loading: false,
    subloading: false,
    error: null,
    response: null,
    getresponse: null,
};

const sclassSlice = createSlice({
    name: 'sclass',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getProjectDetailsRequest: (state) => {
            state.subloading = true;
        },
        getSuccess: (state, action) => {
            state.sclassesList = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = null;
        },
        getStudentsSuccess: (state, action) => {
            state.sclassStudents = action.payload;
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
        getFailed: (state, action) => {
            state.projectsList = [];
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFailedTwo: (state, action) => {
            state.sclassesList = [];
            state.sclassStudents = [];
            state.getresponse = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        detailsSuccess: (state, action) => {
            state.sclassDetails = action.payload;
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
            state.sclassesList = [];
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
    detailsSuccess,
    getFailedTwo,
    resetProjects,
    getProjectDetailsSuccess,
    getProjectDetailsRequest
} = sclassSlice.actions;

export const sclassReducer = sclassSlice.reducer;