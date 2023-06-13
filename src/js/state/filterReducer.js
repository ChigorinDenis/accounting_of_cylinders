import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baloon: 'InActive'
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setBaloonFilter: (state, action) => {
      state.baloon = action.payload;
    }
  },
});

export const { setBaloonFilter } = filterSlice.actions;
export default filterSlice.reducer;