import { SET_BURGER_MENU } from './actionTypes';
import { SET_LANGUAGE } from './actionTypes';

const initialState = {
    isFlagSet: false,
    isLanguage: true,
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BURGER_MENU:
            return {
                ...state,
                isFlagSet: !state.isFlagSet,
            };
        case SET_LANGUAGE:
            return {
                ...state,
                isLanguage: !state.isLanguage,
            }
        default:
            return state;
    }
};

export default myReducer;


