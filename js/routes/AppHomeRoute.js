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
// Comment out this
import { Route } from 'react-router';
import App from '../components/App';
 
const viewerQuery = {
	viewer: (Component, variables) => Relay.QL`query { 
		viewer {
			${Component.getFragment('viewer', { ...variables })}
		}
	}`};

export default (<Route path='/' component={App} queries={viewerQuery} />)



