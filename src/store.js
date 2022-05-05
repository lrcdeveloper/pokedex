import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import totalReducer from './reducers/totalReducer';

// creating store
export const store = createStore(totalReducer);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);