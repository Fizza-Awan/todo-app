// src/App.js
import React from 'react';
// Correct import for ApolloProvider in Apollo Client v5+
import { ApolloProvider } from '@apollo/client/react';
import client from './apolloClient';
import TodoList from './TodoList';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>My Todo App</h1>
        <TodoList />
      </div>
    </ApolloProvider>
  );
}

export default App;