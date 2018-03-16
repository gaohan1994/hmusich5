import * as React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';

import Demo from './containers/demo';
import Home from './containers/home';

const routes = (
    <Switch>
        <Route path="/"     exact={true} component={Home}/>
        <Route path="/demo" component={Demo}/>
    </Switch>
);

export default routes;