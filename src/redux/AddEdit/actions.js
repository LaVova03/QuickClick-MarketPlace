import { SET_DATA } from './actionTypes';
import { SHOW_SUCCESSFUL_WINDOW } from './actionTypes';

export const setData = (data) => ({
    type: SET_DATA,
    payload: data
});

export const showSuccessfulModal = () => ({
    type: SHOW_SUCCESSFUL_WINDOW,
});
