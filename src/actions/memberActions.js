import * as types from './actionTypes';
import projectApi from '../api/mockProjectApi';


function loadMembersSuccess(members) {
    return  {type: types.LOAD_MEMBERS_SUCCESS, members};
}

export function loadMembers() {
    return function(dispatch) {
        return projectApi.getAllMembers().then(members => {
            dispatch(loadMembersSuccess(members));
        }).catch(error => {
            throw (error);
        });
    };
}