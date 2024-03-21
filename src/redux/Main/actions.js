import { SET_BURGER_MENU, SET_LANGUAGE, SET_MODAL_ADD_CARD, ADD_CATEGORY_CARD, SET_EDIT_WINDOW, SET_ADD_CARD_PAGE } from './actionTypes';

export const setBurgerMenu = () => ({
    type: SET_BURGER_MENU,
});

export const setLanguage = () => ({
    type: SET_LANGUAGE,
});

export const setAddCard = () => ({
    type: SET_MODAL_ADD_CARD,
});

export const addCategory = (isCategoryRedux) => ({
    type: ADD_CATEGORY_CARD,
    payload: isCategoryRedux,
})

export const setEditWindow = () => ({
    type: SET_EDIT_WINDOW,
})

export const setAddCardPage = () => ({
    type: SET_ADD_CARD_PAGE,
})
