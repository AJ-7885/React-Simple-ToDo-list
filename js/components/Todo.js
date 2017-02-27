import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';
import TodoTextInput from './TodoTextInput';


import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'

import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';

class Todo extends React.Component {
  state = {
    isEditing: false,
  };
  _handleDestroyClick = () => {
    this._removeTodo();
  };
  _handleLabelEditClick = () => {

    console.log('Fired insideAvatarFunction()!');
    this._setEditMode(true);
  };
  _handleTextInputCancel = () => {
    this._setEditMode(false);
  };
  _handleTextInputDelete = () => {
    this._setEditMode(false);
    this._removeTodo();
  };
  _handleTextInputSave = (text) => {
    this._setEditMode(false);
    this.props.relay.commitUpdate(
      new RenameTodoMutation({todo: this.props.todo, text})
    );
  };
  _removeTodo() {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({todo: this.props.todo, viewer: this.props.viewer})
    );
  }
  _setEditMode = (shouldEdit) => {
    this.setState({isEditing: shouldEdit});
  };
  renderTextInput() {
    return (
      <TodoTextInput
        className="edit"
        commitOnBlur={true}
        initialValue={this.props.todo.text}
        onCancel={this._handleTextInputCancel}
        onDelete={this._handleTextInputDelete}
        onSave={this._handleTextInputSave}
      />
    );
  }
  render() {
    return (
      <div>
      <ListItem
      primaryText={this.props.todo.text}

      leftAvatar={<Avatar><i className="material-icons">person_pin</i></Avatar> }
      secondaryText="Jan 10, 2014"
      rightIconButton={
        <div>
         <span
           className="destroy"
           onClick={this._handleDestroyClick}>
           <i className="material-icons right">delete</i>
         </span>
         <span
            className="edit"
            onClick={this._handleLabelEditClick}>
            <i className="material-icons right">border_color</i>
         </span>
        </div>
        }
      />
      {this.state.isEditing && this.renderTextInput()}
    </div>
    );
  }
}

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
        text,
        ${RemoveTodoMutation.getFragment('todo')},
        ${RenameTodoMutation.getFragment('todo')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${RemoveTodoMutation.getFragment('viewer')},
      }
    `,
  },
});
