import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  split,
  useQuery,
} from '@apollo/client';
import { cache } from './cache';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import Auth from './pages/Auth';

const wsLink = new WebSocketLink({
  uri: `wss:/graphql`,
  operations: {
    reconnect: true,
    connectionParams: () => ({
      authToken: sessionStorage.getItem('token'),
    }),
  },
});

const httpLink = createHttpLink({
  uri: `/`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');

  console.log(token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client = new ApolloClient({
  typeDefs,
  link,
  cache,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Home /> : <Auth />;
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root')
);
