import { createStore, applyMiddleware, compose} from 'redux';
import {thunk} from "redux-thunk"
// import {composeWithDevTools} from "redux-devtools-extension"
import rootreducers from './components/redux/reducers/main';

const middleware = [thunk];

const store = createStore(
    rootreducers,
    compose(applyMiddleware(...middleware))
)

export default store;

