import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  operations: {
    reconnect: true,
    connectionParams: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoic3lsd2lhIn0sImlhdCI6MTYwNDg3MDEyNn0.6xaEgERtjTH7D99hzoVpSnr4q-qg8oswCsRoeSoC37c',
    },
  },
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoic3lsd2lhIn0sImlhdCI6MTYwNDg3MDEyNn0.6xaEgERtjTH7D99hzoVpSnr4q-qg8oswCsRoeSoC37c',
    },
  };
});

const authHttpLink = authLink.concat(httpLink);

//Using this logic, queries and mutations will use HTTP as normal, and subscriptions will use WebSocket.

const link = split(
  (operation) => {
    const definition = getMainDefinition(operation.query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authHttpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
