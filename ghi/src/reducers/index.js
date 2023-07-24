import { combineReducers } from '@reduxjs/toolkit';
import locationsReducer from '../slices/locationsSlice.js';
import eventsReducer from '../slices/eventsSlice.js';
import usersReducer from '../slices/usersSlice.js';
import userReducer from '../slices/userSlice.js';
import petsReducer from '../slices/petsSlice.js';
const rootReducer = combineReducers({
    locations: locationsReducer,
    events: eventsReducer,
    user: userReducer,
    users: usersReducer,
    pets: petsReducer,
});

export default rootReducer;
