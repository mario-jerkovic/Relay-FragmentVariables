import React from 'react';
import Relay from 'react-relay';

class SingleStore extends React.Component {
  render() {
    return (
      <div>
        <h1>SingleStore - tickets</h1>
        <div>{this.props.viewer.store.name} (ID: {this.props.viewer.store.id})</div>
        <TicketContainer store={this.props.viewer.store} />
      </div>
    );
  }
}

export default Relay.createContainer(SingleStore, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        store(id: "c3RvcmU6MQ==") {
          id
          name
          ${TicketContainer.getFragment('store')}
        }
      }
    `,
  },
});

class Ticket extends React.Component {
  render() {
    console.log('TIcket render', this.props.relay.variables.sort)
    return (
      <div>
        <h1>Ticket list</h1>
        <button onClick={() => {
          this.props.relay.setVariables({
            first: 5,
            after: null,
            last: null,
            before: null,
            sort: { subject: this.props.relay.variables.sort && this.props.relay.variables.sort.subject === 'DESC' ? 'ASC' : 'DESC' }
          })
        }}>Sort subject</button>
        <button onClick={() => {
          this.props.relay.setVariables({
            first: 5,
            after: null,
            last: null,
            before: null,
            sort: { title: this.props.relay.variables.sort && this.props.relay.variables.sort.title === 'ASC' ?  'DESC' : 'ASC' }
          })
        }}>Sort title</button>
        <ul>
          {this.props.store.ticketConnection.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.title + ' ' + edge.node.subject} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    )
  }
}

const TicketContainer = Relay.createContainer(Ticket, {
  initialVariables: {
    first: 5,
    after: null,
    last: null,
    before: null,
    sort: null
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ticketConnection(first: $first, last: $last, before: $before, after: $after, sort: $sort) {
          edges {
            node {
              id
              title
              subject
            }
          }
        }
      }
    `,
  },
});
