import {IndexLink, Link} from 'react-router';
import ReadTodosMutation from '../mutations/ReadTodosMutation';

import React from 'react';
import Relay from 'react-relay';

class TodoListHeader extends React.Component {

  render() {
    return (
      <div className="header">
        <span className="todo-count">
          <strong>{this.props.viewer.totalCount }</strong> item
        </span>
      </div>
    );
  }
}

export default Relay.createContainer(TodoListHeader, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(
          first: 2147483647  # max GraphQLInt
        )
         {
           ${ReadTodosMutation.getFragment('todos')},
        },
        totalCount,
      }
    `,
  },
});
