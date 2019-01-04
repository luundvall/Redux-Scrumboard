import { combineReducers } from 'redux'
import projects from '../reducers/projectReducer';
import columns from '../reducers/columnReducer';
import members from '../reducers/memberReducer';

const rootReducer = combineReducers({
  projects,
  columns,
  members
});

export default rootReducer;

