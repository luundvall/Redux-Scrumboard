import { combineReducers } from 'redux'
import projects from '../reducers/projectReducer';
import columns from '../reducers/columnReducer';

const rootReducer = combineReducers({
  projects,
  columns
});

export default rootReducer;

