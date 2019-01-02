
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Kanban from './Kanban';
import { loadProjects } from './actions/projectActions';
import { loadColumns } from './actions/columnActions';


const store = configureStore();

const unsubscribe = store.subscribe(() => console.log(store.getState()))
store.dispatch(loadColumns());
store.dispatch(loadProjects());
unsubscribe();

ReactDOM.render(
  <Provider store={store}>
    <Kanban />
  </Provider>
  , document.getElementById('app'));
  registerServiceWorker();
  

