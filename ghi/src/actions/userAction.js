import { setUsers } from '../slices/usersSlice.js';
import { setUser } from '../slices/userSlice.js';

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/accounts/`
        );
        if (response.ok) {
            const data = await response.json();
            dispatch(setUsers(data));
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error('Cannot fetch users', error);
    }
};

export const fetchUser = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/token/`,
            {
                credentials: 'include',
            }
        );
        const data = await response.json();
        if (data && data.account) {
            dispatch(setUser(data.account));
        } else {
            console.warn(
                'No user account data found or the "account" property is null/undefined.'
            );
        }
    } catch (error) {
        console.error('Cannot fetch users', error);
    }
};
