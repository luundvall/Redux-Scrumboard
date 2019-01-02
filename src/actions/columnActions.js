import * as types from './actionTypes';
import projectApi from '../api/mockProjectApi';


function loadColumnsSuccess(columns) {
    return  {type: types.LOAD_COLUMNS_SUCCESS, columns};
}

export function loadColumns() {
    return function(dispatch) {
        return projectApi.getAllColumns().then(columns => {
            dispatch(loadColumnsSuccess(columns));
        }).catch(error => {
            throw (error);
        });
    };
}

function addColumnSuccess(column) {
    return { type: types.ADD_COLUMN_SUCCESS, column};
}

export function addColumn(column) {
    return function(dispatch) {
        return projectApi.addColumn(column).then(column => {
            dispatch(addColumnSuccess(column));
        }).catch(error => {
            throw(error);
        }); 
    }; 
}