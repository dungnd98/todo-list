import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super();
    this.todoLists = [
      { title: 'Dung di choi', isComplete: true},
      { title: 'Dung di choi', isComplete: true}, 
      { title: 'Dung di choi'}
    ]
  }
  render() { 
    return ( 
      <div className="App">
        {
          this.todoLists.map((item, index) => <TodoItem key={index} item={item} />)
        }
      </div>
    );
  }
}

export default App;
