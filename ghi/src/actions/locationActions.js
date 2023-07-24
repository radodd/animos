import { setLocations } from '../slices/locationsSlice.js';
export const fetchLocations = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/locations/`
        );
        if (response.ok) {
            const data = await response.json();
            dispatch(setLocations(data.locations));
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error('Cannot fetch locations', error);
    }
};
