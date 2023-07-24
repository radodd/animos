import { createSlice } from '@reduxjs/toolkit';

const petsSlice = createSlice({
    name: 'pets',
    initialState: [],
    reducers: {
        setPets: (state, action) => action.payload,
    },
});

export const { setPets } = petsSlice.actions;
export default petsSlice.reducer;
