import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Components/userSlice'; // adjust path if needed

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
