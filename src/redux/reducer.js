import { combineReducers } from 'redux';
import myReducer from './Main/reducers';
import myReducer2 from './AddEdit/reducers';
import myReducer3 from './Chat/reducers';

const rootReducer = combineReducers({
    myReducer,
    myReducer2,
    myReducer3,
});

export default rootReducer;

