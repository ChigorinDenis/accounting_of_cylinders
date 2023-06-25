import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeExpertise: null, // Изначально активной вкладкой является "Оборудование"
  isOpen: false,
  controlsData: {},
  statusExpertise: null
};

const expertiseSlice = createSlice({
  name: 'expertise',
  initialState,
  reducers: {
    setActiveExpertise: (state, action) => {
      state.activeExpertise = action.payload;
    },
    setStatusExpertise: (state, action) => {
      console.log('setStatus Experis', action.payload)
      state.statusExpertise = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setControlsData: (state, action) => {
      console.log(action.payload)
      state.controlsData = action.payload;
    },
  },
});

export const { setActiveExpertise, setIsOpen, setControlsData, setStatusExpertise } = expertiseSlice.actions;
export default expertiseSlice.reducer;