import React from 'react';
import UserComponent from './UserComp';
import TodoComponent from './TodoComp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservices Example</h1>
        <UserComponent />
        <TodoComponent />
      </header>
    </div>
  );
}

export default App;
