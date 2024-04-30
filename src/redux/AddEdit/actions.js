import {
    SET_DATA, SET_ID_CARD, SHOW_SUCCESSFUL_WINDOW, SET_IMAGES, SET_EDIT_IMAGES, RESET_IMAGES
} from './actionTypes';

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

export const resetImages = () => ({
    type: RESET_IMAGES,
});
