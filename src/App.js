import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Login } from './pages';

// lazy allows code splitting so client side doesn't have to take a big hit on what all it has to download
const Login = lazy(() => import ('./pages/login'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}
