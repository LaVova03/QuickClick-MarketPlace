import { SET_DATA, SHOW_SUCCESSFUL_WINDOW } from './actionTypes';

const initialState = {
    isData: [],
    isSuccessfulWindow: false,
};

const myReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                isData: [action.payload],
            };
        case SHOW_SUCCESSFUL_WINDOW:
            return {
                ...state,
                isSuccessfulWindow: !state.isSuccessfulWindow,
            };
        default:
            return state;
    }
};

export default myReducer2;


