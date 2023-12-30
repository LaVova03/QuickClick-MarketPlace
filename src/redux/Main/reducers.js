import { SET_BURGER_MENU } from './actionTypes';

const initialState = {
    isFlagSet: false,
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BURGER_MENU:
            console.log(initialState.isFlagSet);
            return {
                ...state,
                isFlagSet: !state.isFlagSet,
            };
        default:
            return state;
    }
};

export default myReducer;


