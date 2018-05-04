import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    form: reduxFormReducer
});

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk));

export default store;