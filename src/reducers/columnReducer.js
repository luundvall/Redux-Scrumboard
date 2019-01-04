import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function columnReducer(state = initialState.columns, action) {
    switch (action.type) {
        case types.LOAD_COLUMNS_SUCCESS:
            return action.columns;
        case types.ADD_COLUMN_SUCCESS: 
            return Object.assign([], state,
                action.column);
        case types.DELETE_COLUMN_SUCCESS: 
                return [...state.filter(column => column.id !== action.column)];
        default:
            return state;
    }
}