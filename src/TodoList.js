// src/TodoList.js
import React from 'react';
import { useQuery, useMutation} from '@apollo/client/react';
// gql stays in the main package
import { gql } from '@apollo/client';
// GraphQL queries and mutations
const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      name
      description
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($name: String!, $description: String) {
    addTodo(name: $name, description: $description) {
      id
      name
      description
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, { refetchQueries: [{ query: GET_TODOS }] });
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTodo = async () => {
    const name = prompt('Todo name:');
    const description = prompt('Description:');
    if (name) {
      await addTodo({ variables: { name, description } });
    }
  };

  const handleToggle = async (id) => {
    await toggleTodo({ variables: { id } });
  };

  return (
    <div>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {data.getTodos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.name} - {todo.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;