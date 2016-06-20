import 'babel-polyfill';
import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

// Working code
// Uncomment
/*
ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);
*/

// Not working code
// Comment out this
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import useRelay from 'react-router-relay';

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render(<Router history={browserHistory} routes={AppHomeRoute} render={applyRouterMiddleware(useRelay)} environment={Relay.Store} />, rootNode);

