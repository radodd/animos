import { createSlice } from '@reduxjs/toolkit';

const locationsSlice = createSlice({
    name: 'locations',
    initialState: [],
    reducers: {
        setLocations: (state, action) => action.payload,
    },
});

export const { setLocations } = locationsSlice.actions;
export default locationsSlice.reducer;
