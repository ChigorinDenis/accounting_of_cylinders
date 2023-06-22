import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const baloonsSlice = createSlice({
  name: 'baloons',
  initialState,
  reducers: {
    setUnsurvivalBaloons: (state, action) => {
      console.log('ACTION BALOONS', action.payload)
      return action.payload;
    },
  
  },
});

export const { setUnsurvivalBaloons } = baloonsSlice.actions;
export default baloonsSlice.reducer;