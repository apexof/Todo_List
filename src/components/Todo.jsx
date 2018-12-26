import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Button from './Button';

class Todo extends React.Component {
  state = {
    editing: false
  }

  componentDidUpdate() {
    if(this.state.editing) {
      this.refs.title.focus();
      this.refs.title.select();
    }
  }

  renderDisplay() {
    return (
      <div className={`todo${this.props.completed ? " completed" : ""}`}>
        <Checkbox
          onChange={() => this.props.onStatusChange(this.props.id)}
          checked={this.props.completed}
        />
  
        <span className="todo-title">{this.props.title}</span>
        
        <Button className="edit icon" icon="edit" onClick={() => this.setState({ editing: true})} />

        <Button className="delete icon" icon="delete" onClick={() => this.props.onDelete(this.props.id)}/>
      </div>     
    );
  }

  renderForm() {
    return (
      <form className="todo-edit-form" onSubmit={this.handleSubmit}>
        <input type="text" ref="title" defaultValue={this.props.title} />
        <Button className="save icon" icon="save" type="submit" />
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let title = this.refs.title.value;

    this.props.onEdit(this.props.id, title);
    this.setState({ editing: false});
  }

  render() {
    if (this.state.editing){
      return this.renderForm();
    } else {
      return this.renderDisplay();
    }
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Todo;