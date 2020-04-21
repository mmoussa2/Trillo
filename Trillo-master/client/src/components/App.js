import React from "react";
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Login from './session/login';
import Register from './session/register';
import Home from './home/home';
import BoardDetail from'./board/board-detail';
import BoardList from "./board/board-list";
 import Board from './board/board';

export default () => (
  <Switch>
    <AuthRoute exact path="/login" component={Login} />
    <AuthRoute exact path="/register" component={Register} />
    <ProtectedRoute path="/boards/:boardId" component={BoardDetail} />
    <ProtectedRoute path="/boards" component={Board} />
    {/* <ProtectedRoute path="/boards" component={BoardList} /> */}
    <Route path="/" component={Home} />
  </Switch>
);