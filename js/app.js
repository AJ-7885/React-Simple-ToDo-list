
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {IndexRoute, Route, Router} from 'react-router';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import ViewerQueries from './queries/ViewerQueries';

import {createHashHistory} from 'history';
import {applyRouterMiddleware, useRouterHistory} from 'react-router';
const history = useRouterHistory(createHashHistory)({ queryKey: false });
const mountNode = document.getElementById('root');
import useRelay from 'react-router-relay';

import AppBar from 'material-ui/AppBar'
import {List} from 'material-ui/List'
import Divider from 'material-ui/Divider'

ReactDOM.render(
  <Router
    environment={Relay.Store}
    history={history}
    render={applyRouterMiddleware(useRelay)}>
    <Route path="/"
      component={TodoApp}
      queries={ViewerQueries}>
      <IndexRoute
        component={TodoList}
        queries={ViewerQueries}
        prepareParams={() => ({status: 'any'})}
      />
      <Route path=":status"
        component={TodoList}
        queries={ViewerQueries}
      />
    </Route>
  </Router>,
  mountNode
);
