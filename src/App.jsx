import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';

class App extends React.Component {
  state = {
    todos: this.props.initialData
  }

  nextId = () => {
    let length = this.state.todos.length;
    let lastId = this.state.todos[length-1].id
    return ++lastId
  }

  handleStatusChange = (id) => {
    const todos = this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;        
      }
      return todo;
    });

    this.setState({ todos });
  }

  handleDelete = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    
    this.setState({ todos });
  }

  handleAdd = (title) => {
    let todo = {
      id: this.nextId(),
      title: title,
      completed: false
    };

    const todos = [...this.state.todos, todo];
    this.setState({ todos });
  }

  handleEdit = (id, title) => {
    let todos = this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.title = title;
      } 
      return todo;
    });
    this.setState({ todos });
  }

  render(){
    return (
      <main>
        <Header title={this.props.title} todos={this.state.todos} />

        <CSSTransitionGroup 
          component="section" 
          transitionName="slide"
          transitionAppear={true}
          transitionAppearTimeout={1000} 
          transitionEnterTimeout={500}          
          transitionLeaveTimeout={500}
          className="todo-list">
          {this.state.todos.map(todo => 
            <Todo 
              key={todo.id}
              id={todo.id}
              title={todo.title} 
              completed={todo.completed}
              onStatusChange={this.handleStatusChange}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />)
          }
        </CSSTransitionGroup>
        <Form onAdd={this.handleAdd} />
      </main>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })).isRequired
};

App.defaultProps = {
  title: 'React Todo'
};

export default App;