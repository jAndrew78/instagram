import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

// lazy allows code splitting so client side doesn't have to take a big hit on what all it has to download
// .js file won't come through as a bundle of all pages available. Just imports the page that's requested
const Login = lazy(() => import ('./pages/login'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}
