import { combineReducers } from 'redux';
import myReducer from './Main/reducers';
import myReducer2 from './AddEdit/reducers';

const rootReducer = combineReducers({
    myReducer,
    myReducer2,
});

export default rootReducer;

