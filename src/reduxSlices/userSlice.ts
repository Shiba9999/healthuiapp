import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userName: string;
  password: string;
  type: string;
  fullName: string;
}

interface UserState {
  registeredUser: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  registeredUser: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRegisteredUser(state, action: PayloadAction<User>) {
      try {
        state.registeredUser = action.payload;
        console.log('User registered successfully:', action.payload);
      } catch (error) {
        console.error('Error setting registered user:', error);
      }
    },
    clearRegisteredUser(state) {
      try {
        state.registeredUser = null;
        state.isLoggedIn = false;
        console.log('User data cleared');
      } catch (error) {
        console.error('Error clearing user data:', error);
      }
    },
    loginUser(state) {
      try {
        state.isLoggedIn = true;
        console.log('User logged in successfully');
      } catch (error) {
        console.error('Error logging in user:', error);
      }
    },
    logoutUser(state) {
      try {
        state.registeredUser = null;
        state.isLoggedIn = false;
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Error logging out user:', error);
      }
    },
  },
});

export const { setRegisteredUser, clearRegisteredUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;