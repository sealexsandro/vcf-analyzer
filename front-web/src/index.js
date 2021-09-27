import React from 'react';
import ReactDOM from 'react-dom';

// import bootstrap js
import 'bootstrap/dist/js/bootstrap';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';


import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
// import { Dashboard } from './pages/DashBoard';
import { TableOfVariants } from './pages/TableOfVariants';
import { StatisticsCharts } from './pages/Statistics';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/table-variants" exact>
          <TableOfVariants />
        </Route>
        <Route path="/statistics" exact>
          <StatisticsCharts />
        </Route>
        {/* <Route path="/vcftable" exact>
          <Dashboard />
        </Route>
        <Route path="/charts" exact>
          <Charts />
        </Route> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

