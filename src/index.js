
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import Kanban from './Kanban';
import { loadProjects } from './actions/projectActions';
import { loadColumns } from './actions/columnActions';
import { loadMembers } from './actions/memberActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './index.css';

const store = configureStore();

const unsubscribe = store.subscribe(() => console.log(store.getState()))
store.dispatch(loadColumns());
store.dispatch(loadProjects());
store.dispatch(loadMembers());
unsubscribe();

ReactDOM.render(
  <Provider store={store}>
    <Kanban />
  </Provider>
  , document.getElementById('app'));
registerServiceWorker();


