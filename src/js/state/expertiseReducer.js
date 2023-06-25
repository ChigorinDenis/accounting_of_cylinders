import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeExpertise: null, // Изначально активной вкладкой является "Оборудование"
  isOpen: false,
  controlsData: {},
  statusExpertise: null,
  toggleUpdate: false,
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
    setToggleUpdate: (state) => {
      console.log('toggle', state.toggleUpdate)
      state.toggleUpdate = !state.toggleUpdate
    },
  },
});

export const { setActiveExpertise, setIsOpen, setControlsData, setStatusExpertise, setToggleUpdate } = expertiseSlice.actions;
export default expertiseSlice.reducer;