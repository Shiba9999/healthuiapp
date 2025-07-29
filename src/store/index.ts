import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reduxSlices/userSlice';
import healthReducer from '../reduxSlices/healthResultSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 