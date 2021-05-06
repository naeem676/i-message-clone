import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import chatReducer from './ChatSlice';



export default configureStore({
    reducer:{
        user: userReducer,
        chat: chatReducer,
    },
})