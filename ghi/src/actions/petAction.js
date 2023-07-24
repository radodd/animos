import { setPets } from '../slices/petsSlice.js';
export const fetchPets = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/pets/`
        );
        if (response.ok) {
            const data = await response.json();
            dispatch(setPets(data.pets));
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error('Cannot fetch pets', error);
    }
};
