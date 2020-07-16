import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import tickImg from './img/tick.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'all',
      newItem: '',
      todoItems: [
        { title: 'Dung di choi', isComplete: false, isEdit: false },
        { title: 'An com', isComplete: false, isEdit: false },
        { title: 'Chieu di hoc', isComplete: false, isEdit: false }
      ]
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.coutItem = this.coutItem.bind(this);
    this.todosComplete = this.todosComplete.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    // this.onClickAll = this.onClickAll.bind(this);
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

  //Xoa item

  deleteTodo(index) {
    const { todoItems } = this.state;
    todoItems.splice(index, 1);
    this.setState({
      todoItems
    })
  }

  //sua item

  editItem(item, index) {
    const {todoItems} = this.state;
    item.isEdit = !item.isEdit;
    todoItems.splice(index, 1, item);
    this.setState({
      todoItems
    })
    // return (event) => {
    //   const { todoItems } = this.state;
    //   let isEdit = todoItems.isEdit;
    //   const index = todoItems.indexOf(item);
    //   this.setState({
    //     todoItems: [
    //       ...todoItems.slice(0, index),
    //       {
    //         ...item, isEdit: !isEdit
    //       },
    //       ...todoItems.slice(index + 1)
    //     ]
    //   })
    // }
  }

  doneEdit(item, index, event) {
    const beforeTitle = item.title;
    if(event.key === "Enter") {
      const {todoItems} = this.state;
      const text = event.target.value;
      item.isEdit = !item.isEdit;
      if (text.trim().length === 0) {
        item.title = beforeTitle;
      }
      else {
        item.title = text;
      }
      todoItems.splice(index, 1, item)
      this.setState({
        todoItems
      })
    }
    // return (event) => {
    //   if(event.key === "Enter") {
    //     const isEdit = item.isEdit;
    //     const beforeTitle = item.title;
    //     const {todoItems} = this.state;
    //     const index = todoItems.indexOf(item);
    //     const text = event.target.value;
    //     if (text.trim().length === 0) {
    //       return {beforeTitle}
    //     }
    //     this.setState({
    //       todoItems: [
    //         ...todoItems.slice(0, index),
    //         {
    //           ...item, title: text, isEdit: !isEdit
    //         },
    //         ...todoItems.slice(index+1)
    //       ]
    //     })  
    //   }
    // }
  }

  //Hien so item chua hoan thanh
  coutItem() {
    const {todoItems} = this.state;
    const dem = todoItems.filter(item => !item.isComplete).length;
    return dem;
  }
  //Dem so item da hoan thanh
  todosComplete() {
    return this.state.todoItems.filter(item => item.isComplete).length;
  }
  
  //Xoa cac item da hoan thanh
  onClickComplete() {
    const{todoItems} = this.state;
    const items = todoItems.filter(item => !item.isComplete);
    this.setState({
      todoItems: [
        ...items
      ]
    })
  }

  // onClickAll() {
  //   const {todoItems} = this.state;
  //   //const items = this.state.todoItems.filter(item => item);
  //   this.setState({
  //     todoItems
  //   })
  // }
  //Thay doi gia tri filter
  updateFilter(filter) {
    this.setState({
      filter: filter
    })
  }

  //Thay doi trang thai filter
  todosFilter = () => {
    if(this.state.filter === 'all') {
      return this.state.todoItems;
    }
    else if(this.state.filter === 'active') {
      return this.state.todoItems.filter(item => !item.isComplete)
    }
    else if(this.state.filter === 'complete') {
      return this.state.todoItems.filter(item => item.isComplete)
    }
  }

  //Chon tat ca item
  onClick = () => {
    const {todoItems} = this.state;
    todoItems.forEach(item => item.isComplete = !item.isComplete)
    this.setState({
      todoItems
    })
  }

  render() {
    const { todoItems, newItem, filter } = this.state;
    return (
      <div className="App">
        <h1>Todo List</h1>
        <div className="Header">
          <img  src={tickImg} width={32} onClick={this.onClick} />
          <input
            type="text"
            onKeyUp={this.onKeyUp}
            value={newItem}
            onChange={this.onChange}
            placeholder="Nhap ten cong viec..."
          />
        </div>
        {
          this.todosFilter().map((item, index) =>
            <TodoItem key={index}
              item={item}
              onClickCheck={this.onItemClick(item)}
              onClickDelete={() => this.deleteTodo(index)}
              onEdit={(event) => this.editItem(item, index, event)}
              doneEdit={(event) => this.doneEdit(item, index, event)}
            />)
        }
        <Footer 
          cout={this.coutItem()}
          todosComplete={this.todosComplete()}
          onClickComplete = {this.onClickComplete}
          onClickAll = {() => this.updateFilter('all')}
          onClickActive = {() => this.updateFilter('active')}
          onClickDone = {() => this.updateFilter('complete')}
          filter={filter}
          />
      </div>
    );
  }
}

export default App;
