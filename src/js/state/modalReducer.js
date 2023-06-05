import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenNewExpertise: false,
  isOpenNewBaloon: false,
  isOpenNewEmployee: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpenNewExpertise: (state, action) => {
      state.isOpenNewExpertise = action.payload;
    },
    setIsOpenNewBaloon: (state, action) => {
      state.isOpenNewBaloon = action.payload;
    },
    setIsOpenNewEmployee: (state, action) => {
      state.isOpenNewEmployee = action.payload;
    },
  },
});

export const { setIsOpenNewExpertise, setIsOpenNewBaloon, setIsOpenNewEmployee } = modalSlice.actions;
export default modalSlice.reducer;