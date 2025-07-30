// src/reduxSlices/loggedInUserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoggedInUser {
  userName: string;
  password: string;
  type: string;
  fullName: string;
}

interface LoggedInUserState {
  user: LoggedInUser | null;
}

const initialState: LoggedInUserState = {
  user: null,
};

const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setLoggedInUser(state, action: PayloadAction<LoggedInUser>) {
      state.user = action.payload;
    },
    clearLoggedInUser(state) {
      state.user = null;
    },
  },
});

export const { setLoggedInUser, clearLoggedInUser } = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
