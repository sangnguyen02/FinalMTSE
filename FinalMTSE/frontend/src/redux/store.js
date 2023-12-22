import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { majorReducer } from './majorRelated/majorSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        major: majorReducer
    },
});

export default store;
