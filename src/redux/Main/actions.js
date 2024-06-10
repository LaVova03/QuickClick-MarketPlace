import {
    SET_LANGUAGE, SET_MODAL_ADD_CARD, ADD_CATEGORY_CARD, SET_EDIT_WINDOW,
    SET_ALL_ADVERTS
} from './actionTypes';

export const setLanguage = () => ({
    type: SET_LANGUAGE,
});

export const setAddCard = () => ({
    type: SET_MODAL_ADD_CARD,
});

export const addCategory = (isCategoryRedux) => ({
    type: ADD_CATEGORY_CARD,
    payload: isCategoryRedux,
});

export const setEditWindow = () => ({
    type: SET_EDIT_WINDOW,
});

export const setAllAdverts = (data) => ({
    type: SET_ALL_ADVERTS,
    payload: data
});