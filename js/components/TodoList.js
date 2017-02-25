
import Todo from './Todo';

import React from 'react';
import Relay from 'react-relay';

class TodoList extends React.Component {

  renderTodos() {
    return this.props.viewer.todos.edges.map(edge =>
      <Todo
        key={edge.node.id}
        todo={edge.node}
        viewer={this.props.viewer}
      />
    );
  }
  render() {
    const numTodos = this.props.viewer.totalCount;
    return (
      <section className="main">
        <ul className="todo-list">
          {this.renderTodos()}
        </ul>
      </section>
    );
  }
}

export default Relay.createContainer(TodoList, {
  initialVariables: {
    status: null,
  },

  prepareVariables({status}) {
    let nextStatus;
    if (status === 'active') {
      nextStatus = status;
    } else {
      nextStatus = 'any';
    }
    return {
      status: nextStatus,
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(
          status: $status,
          first: 2147483647  # max GraphQLInt
        ) {
          edges {
            node {
              id,
              ${Todo.getFragment('todo')},
            },
          }
        },
        totalCount,
        ${Todo.getFragment('viewer')},
      }
    `,
  },
});
