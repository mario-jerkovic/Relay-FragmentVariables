import React from 'react';
import Relay from 'react-relay';

class StoreForm extends React.Component {
  
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
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
    viewer: () => Relay.QL`
      fragment on Viewer {
        store(id: $id) {
          id,
          number,
          name,
          ${StoreListTickets.getFragment('store')}
        }
      }
    `
  }
});


class TicketList extends React.Component {
  render() {
    const { relay } = this.props;
    return (
      <div>
        <button onClick={() =>{
          this.props.relay.setVariables({
            first: 1,
            sort: {
              subject: relay.variables.sort && relay.variables.first === 1 ? { __e: "test1"} : { __ne: 'test2'}
            }
          })
        }}>Test</button>
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
    sort: null,
    filter: null
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ticketConnection(first: $first, after: $after, last: $last, before: $before, sort: $sort ) {
          edges{
            node{
              title
              subject
            }
          }
        }
      }
    `
  }
});
