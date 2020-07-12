import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tickImg from './img/tick.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [
        { title: 'Dung di choi', isComplete: false, isEdit: false },
        { title: 'An com', isComplete: false, isEdit: false },
        { title: 'Chieu di hoc', isComplete: false, isEdit: false }
      ]
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClick(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);

      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      })
    }
  }

  onKeyUp(event) {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (text.trim().length === 0) {
        return;
      }
      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems
        ]
      })
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    })
  }

  deleteTodo(index) {
    const { todoItems } = this.state;
    todoItems.splice(index, 1);
    this.setState({
      todoItems
    })
  }

  editItem(item) {
    return (event) => {
      const { todoItems } = this.state;
      let isEdit = todoItems.isEdit;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item, isEdit: !isEdit
          },
          ...todoItems.slice(index + 1)
        ]
      })
    }
  }

  render() {
    const { todoItems, newItem, dem } = this.state;
    return (
      <div className="App">
        <h1>Todo List</h1>
        <div className="Header">
          <img src={tickImg} width={32} />
          <input
            type="text"
            onKeyUp={this.onKeyUp}
            value={newItem}
            onChange={this.onChange}
            placeholder="Nhap ten cong viec..."
          />
        </div>
        {
          todoItems.map((item, index) =>
            <TodoItem key={index}
              item={item}
              onClickCheck={this.onItemClick(item)}
              onClickDelete={() => this.deleteTodo(index)}
              onEdit={this.editItem(item)}
            />)
        }
      </div>
    );
  }
}

export default App;
