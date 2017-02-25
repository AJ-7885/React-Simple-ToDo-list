

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoListHeader from './TodoListHeader';
import TodoTextInput from './TodoTextInput';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui'
import {List} from 'material-ui/List'

import React from 'react';
import Relay from 'react-relay';

class TodoApp extends React.Component {
  _handleTextInputSave = (text) => {
    this.props.relay.commitUpdate(
      new AddTodoMutation({text, viewer: this.props.viewer})
    );
  };
  render() {
    const hasTodos = this.props.viewer.totalCount > 0;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h3>
              <TodoListHeader
                todos={this.props.viewer.todos}
                viewer={this.props.viewer}
              />
            </h3>

          </header>

          {this.props.children}

          <TodoTextInput
            autoFocus={true}
            className="new-todo"
            onSave={this._handleTextInputSave}
            placeholder="What needs to be done?"
          />

        </section>

      </div>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
        ${AddTodoMutation.getFragment('viewer')},
        ${TodoListHeader.getFragment('viewer')}
      }
    `,
  },
});
