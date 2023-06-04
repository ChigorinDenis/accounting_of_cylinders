import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeExpertise: null, // Изначально активной вкладкой является "Оборудование"
  isOpen: false,
  controlsData: {}
};

const expertiseSlice = createSlice({
  name: 'expertise',
  initialState,
  reducers: {
    setActiveExpertise: (state, action) => {
      state.activeExpertise = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setControlsData: (state, action) => {
      state.controlsData = action.payload;
    },
  },
});

export const { setActiveExpertise, setIsOpen, setControlsData } = expertiseSlice.actions;
export default expertiseSlice.reducer;