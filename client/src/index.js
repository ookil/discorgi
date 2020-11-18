import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: 'http://localhost:4000/',
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
