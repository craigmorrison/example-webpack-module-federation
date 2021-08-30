import Header from './header';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Table = React.lazy(() => import('table/Table'));
const Counter = React.lazy(() => import('counter/Counter'));
const People = React.lazy(() => import('people/People'));

function Shell() {
  return (
    <Router>
      <Header title="Federated App">
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/table">Table</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
          </ul>
        </nav>
      </Header>

      <Switch>
        <Route exact path="/">
          <h2>Home</h2>
          <p>This is the home page.</p>
        </Route>
        <Route path="/table">
          <React.Suspense fallback="Loading">
            <Table />
          </React.Suspense>
        </Route>
        <Route path="/counter">
          <React.Suspense fallback="Loading">
            <Counter />
          </React.Suspense>
        </Route>
        <Route path="/people">
          <React.Suspense fallback="Loading">
            <People />
          </React.Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default Shell;
