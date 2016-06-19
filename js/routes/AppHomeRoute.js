import Relay from 'react-relay';
import React from 'react';
import { Route } from 'react-router';

import App from '../components/App';

/*export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };

  static routeName = 'AppHomeRoute';
}*/

const viewerQuery = { viewer: () => Relay.QL`query { viewer }`};

export default (
  <Route path='/' component={App} queries={viewerQuery}/>
)


