import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function projectReducer(state = initialState.projects, action) {
    switch (action.type) {
        case types.LOAD_PROJECTS_SUCCESS:
            return action.projects;
        case types.UPDATE_PROJECT_SUCCESS:
            return [
                ...state.filter(project => project.name !== action.project.name),
                Object.assign({}, action.project)
            ];
        case types.DELETE_PROJECT_SUCCESS:
            return [...state.filter(project => project.id !== action.project)];
        case types.ADD_KANBANCARD_SUCCESS:
            return [...state, 
                Object.assign({}, action.project)
            ];
        case types.UPDATE_KANBANCARD_SUCCESS: 
            return [
                ...state.filter((project) => project.id !== action.project.id),
                Object.assign({}, action.project)
            ];
        default:
            return state;
    }
}