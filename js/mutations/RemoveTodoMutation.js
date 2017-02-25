import Relay from 'react-relay';

export default class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{removeTodo}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveTodoPayload @relay(pattern: true) {
        deletedTodoId,
        viewer {
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedTodoId',
    }];
  }
  getVariables() {
    return {
      id: this.props.todo.id,
    };
  }
  getOptimisticResponse() {
    const viewerPayload = {id: this.props.viewer.id};
    if (this.props.viewer.totalCount != null) {
      viewerPayload.totalCount = this.props.viewer.totalCount - 1;
    }
    return {
      deletedTodoId: this.props.todo.id,
      viewer: viewerPayload,
    };
  }
}
