import { SET_TOTAL } from '../actions/type';

const initialState = {
    total: 0,
}

const totalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOTAL:
            return { ...state, total: action.payload }    
        default:
            return { ...state };
    }
}

export default totalReducer;