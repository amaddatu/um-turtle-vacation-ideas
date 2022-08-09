import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Users from './pages/Users';
import Matchup from './pages/Matchup';
import Vote from './pages/Vote';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.css';

import UserProvider from './context/UserContext';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <UserProvider>
          <div className="flex-column justify-center align-center min-100-vh bg-primary">
            <Routes>
              <Route 
                path="/" 
                element={<Home />}
              />
              <Route 
                path="/users" 
                element={<Users />}
              />
              <Route 
                path="/login" 
                // component={Login}
                element={(
                  <Login />
                )}
                
              />
              <Route 
                path="/matchup" 
                element={<Matchup />}
              />
              <Route 
                path="/matchup/:id" 
                element={<Vote />}
              />
              <Route 
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
