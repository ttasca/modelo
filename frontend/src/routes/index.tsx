import React from 'react';
import { Switch } from 'react-router-dom';
// Switch -> Garante apenas que uma rota é mostrada por momento, e route -> é cada rota da aplicação.

import Route from './Route';
// Importação das páginas que tenho no sistema:
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';


// Função de rotas:
const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
