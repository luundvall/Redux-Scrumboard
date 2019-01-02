import * as types from '../actions/actionTypes';

export default function projectReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_PROJECTS_SUCCESS:
            return action.projects;
        case types.UPDATE_PROJECT_SUCCESS:
        return [
                ...state.filter(project => project.name !== action.project.name),
                Object.assign({}, action.project)
            ];
        case types.DELETE_PROJECT_SUCCESS:
        return state = action.project;
        default:
            return state;
    }
}