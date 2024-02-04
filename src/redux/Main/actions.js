import { SET_BURGER_MENU, SET_LANGUAGE, SET_MODAL_ADD_CARD, SHOW_BUTTON_EXIT } from './actionTypes';

export const setBurgerMenu = () => ({
    type: SET_BURGER_MENU,
});

export const setLanguage = () => ({
    type: SET_LANGUAGE,
});

export const setAddCard = () => ({
    type: SET_MODAL_ADD_CARD,
});

export const showButtonExit = () => ({
    type: SHOW_BUTTON_EXIT,
});
