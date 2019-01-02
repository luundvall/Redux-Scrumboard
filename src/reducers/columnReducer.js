import * as types from '../actions/actionTypes';

export default function columnReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_COLUMNS_SUCCESS:
            return action.columns;
        case types.ADD_COLUMN_SUCCESS: 
            return Object.assign([], state,
                action.column);
        default:
            return state;
    }
}