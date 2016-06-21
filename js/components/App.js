import React from 'react';
import Relay from 'react-relay';

class StoreForm extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Store - tickets</h1>
        <div>{this.props.viewer.store.name} (ID: {this.props.viewer.store.id})</div>
        <StoreListTickets store={this.props.viewer.store} />
      </div>
    );
  }
}

export default Relay.createContainer(StoreForm, {
  initialVariables: {
    id: "c3RvcmU6MQ=="
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on Viewer {
        store(id: $id) {
          id,
          name,
          ${StoreListTickets.getFragment('store', { ...variables })}
        }
      }
    `
  }
});


class TicketList extends React.Component {
  constructor(props) {
    super(props);
  }

  filterHandler = () => {
    const {relay} = this.props;

    relay.setVariables({
      filter: {
        subject: !relay.variables.filter ? { __e: 'something' } : { __ne: 'else' }
      }
    })
  };

  render() {
    return (
      <div>
        <h1>Tickets</h1>
        <button onClick={this.filterHandler}>Change filter</button>
        <div>{`Active filters: ${JSON.stringify(this.props.relay.variables.filter, null, 2)}`}</div>
        <ul>
          {this.props.store.ticketConnection.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.title + ' ' + edge.node.subject} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

const StoreListTickets = Relay.createContainer(TicketList, {
  initialVariables: {
    first: 5,
    after: null,
    last: null,
    before: null,
    filter: null
  },
  fragments: {
    store: (variables) => Relay.QL`
      fragment on Store {
        ticketConnection(first: $first, last: $last, before: $before, after: $after, filter: $filter ) {
          edges{
            node{
              id,
              title,
              subject
            }
          }
        }
      }
    `
  }
});
