import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  userName: null,
  password: null,
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      console.log(action.payload);
    },
    setSignOut: state => {
      state.email = null;
      state.userName = null;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export default authSlice.reducer;
