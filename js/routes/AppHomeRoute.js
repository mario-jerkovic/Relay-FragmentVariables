import Relay from 'react-relay';
import React from 'react';

// Working code
// Uncomment
/*
export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };

  static routeName = 'AppHomeRoute';
}
*/

// Not working code
import { Route } from 'react-router';
import App from '../components/App';
 
const viewerQuery = { viewer: () => Relay.QL`query { viewer }`};

export default (<Route path='/' component={App} queries={viewerQuery}/>)



