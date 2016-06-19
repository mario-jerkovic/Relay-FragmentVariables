import React from 'react';
import Relay from 'react-relay';
import SingleStore from './SingleStore';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Store list</h1>
        <ul>
          {this.props.viewer.storeConnection.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
          )}
        </ul>
        <SingleStore viewer={this.props.viewer} />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        storeConnection(first: 100) {
          edges {
            node {
              id
              name
            }
          }
        },
        ${SingleStore.getFragment('viewer')}
      }
    `,
  },
});
