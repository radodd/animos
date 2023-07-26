import { setEvents } from '../slices/eventsSlice.js';
export const fetchEvents = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/events`
        );
        if (response.ok) {
            const data = await response.json();
            dispatch(setEvents(data.events));
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error('Cannot fetch events', error);
    }
};
