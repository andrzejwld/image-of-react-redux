import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import thunk from 'redux-thunk';
import uploadFileReducer from './uploadFileReducer';

const reducer = combineReducers({
    form: reduxFormReducer,
    uploadFileReducer: uploadFileReducer
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

export default store;