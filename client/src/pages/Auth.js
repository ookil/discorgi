import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  return (
    <Router>
      <Redirect from='/' to='/login' />
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
  );
};

export default Auth;
