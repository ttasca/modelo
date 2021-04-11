import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

// Se quero que esteja logado para acessar as páginas uso o provider. Se não estiver por volta do provider acessa sem estar logado.
// Se está dentro do AuthProvider vai ter acesso aos dados de login. assim que funiciona o conceito de context.
// Value informa qual informação será acessada pelas páginas.
//AuthContext.Provider

const App: React.FC = () => {
    return (
        <Router>
          <AppProvider>
            <Routes />
          </AppProvider>

          <GlobalStyle />
        </Router>
      );
    };


export default App;
