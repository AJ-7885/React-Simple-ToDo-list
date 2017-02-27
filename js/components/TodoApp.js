

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoListHeader from './TodoListHeader';
import TodoTextInput from './TodoTextInput';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import {List} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {grey300,grey600} from 'material-ui/styles/colors'

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
     <MuiThemeProvider>
      <div className="container">
        <AppBar title={  <TodoListHeader
            todos={this.props.viewer.todos}
            viewer={this.props.viewer}
          />}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        showMenuIconButton={false}>
      </AppBar>
        <section className="todoapp">
          <div style={{height:'400px',position:'relative'}}>
          <List
            style={{position:'absolute', bottom:'0px',width:'100%',maxHeight:'400px',overflow: 'auto'}}>
            {this.props.children}
          </List>
          </div>
          <TodoTextInput
            autoFocus={true}
            className="new-todo"
            onSave={this._handleTextInputSave}
            placeholder="What needs to be done?"
          />

        </section>

      </div>
     </MuiThemeProvider>
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
