import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userName: `Muhmmed Medhat`,
  },
  reducers: {
    islogIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    }
  }
}
);
export const { islogIn } = authSlice.actions;
export default authSlice.reducer;
