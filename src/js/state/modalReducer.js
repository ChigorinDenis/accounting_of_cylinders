import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenNewExpertise: false,
  isOpenNewBaloon: false,
  isOpenNewEmployee: false,
  isOpenNewEquipment: false,
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
    setIsOpenNewEquipment: (state, action) => {
      state.isOpenNewEquipment = action.payload;
    },
  },
});

export const { setIsOpenNewExpertise, setIsOpenNewBaloon, setIsOpenNewEquipment, setIsOpenNewEmployee } = modalSlice.actions;
export default modalSlice.reducer;