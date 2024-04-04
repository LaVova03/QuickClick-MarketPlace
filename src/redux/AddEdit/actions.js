import { SET_DATA } from './actionTypes';
import { SET_ID_CARD } from './actionTypes';
import { SHOW_SUCCESSFUL_WINDOW } from './actionTypes';
import { SET_IMAGES } from './actionTypes';
import { SET_EDIT_IMAGES } from './actionTypes';

export const setData = (data) => ({
    type: SET_DATA,
    payload: data
});

export const setIdCard = (data) => ({
    type: SET_ID_CARD,
    payload: data
});

export const showSuccessfulModal = () => ({
    type: SHOW_SUCCESSFUL_WINDOW,
});

export const setImages = (data) => ({
    type: SET_IMAGES,
    payload: data
});

export const setEditImages = (index, data) => ({
    type: SET_EDIT_IMAGES,
    payload: { index, data }
});

