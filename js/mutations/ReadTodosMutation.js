
import Relay from 'react-relay';

export default class ReadTodosMutation extends Relay.Mutation {
  static fragments = {
    todos: () => Relay.QL`
      fragment on TodoConnection {
        edges {
          node {
            id,
          },
        },
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        totalCount,
      }
    `,
  };
}
