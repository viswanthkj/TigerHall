import React from 'react';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.staging.tigerhall.io/graphql',
  cache: new InMemoryCache(),
});

const mainApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default mainApp;
