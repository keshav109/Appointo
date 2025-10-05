import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from '../features/doctors/doctorSlice';
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    // This is where you will add your different state slices
    doctors: doctorsReducer,
    auth: authReducer,
  },
});