import { createSlice } from '@reduxjs/toolkit';

const petsSlice = createSlice({
  name: 'pets',
  initialState: [],
  reducers: {
    setPets: (state, action) => {
      return action.payload;
    },
    removePet: (state, action) => {
      const petId = action.payload;
      state =  state.filter(({id}) => id !== petId);
    console.log("THE ACTION", action);
    },
  },
});

export const { setPets, removePet } = petsSlice.actions;
export default petsSlice.reducer;
