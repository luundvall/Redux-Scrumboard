import * as types from './actionTypes';
import projectApi from '../api/mockProjectApi';

function loadProjectsSuccess(projects) {
    return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function loadProjects() {
    return function (dispatch) {
        return projectApi.getAllProjects().then(projects => {
            dispatch(loadProjectsSuccess(projects));
        }).catch(error => {
            throw (error);
        });
    };
}

function updateProjectSuccess(project) {
    return { type: types.UPDATE_PROJECT_SUCCESS, project };
}

export function updateProject(project, newColumn) {
    return function (dispatch) {
        return projectApi.updateProject(project, newColumn).then(updatedProject => {
            dispatch(updateProjectSuccess(updatedProject));
        }).catch((error) => {
            throw (error);
        });
    };
}

function deleteProjectSuccess(project) {
    return { type: types.DELETE_PROJECT_SUCCESS, project };
}

export function deleteProject(project) {
    return function (dispatch) {
        return projectApi.deleteProject(project.id).then(project => {
            dispatch(deleteProjectSuccess(project));
        }).catch((error) => {
            throw (error);
        });
    }
}

function addKanbanCardSuccess(project) {
    return { type: types.ADD_KANBANCARD_SUCCESS, project };
}


export function addKanbanCard(project) {
    return function (dispatch) {
        return projectApi.addKanbanCard(project).then(project => {
            dispatch(addKanbanCardSuccess(project));
        }).catch((error) => {
            throw (error);
        });
    };
}

