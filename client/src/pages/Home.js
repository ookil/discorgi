import '../App.scss';
import MainServerContainer from '../components/messages/MainServerContainer';
import ServerList from '../components/servers/ServerList';
import ServerState from '../context/ServerState';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const Home = () => {
  

  return (
    <ServerState>
      <Router>
        <div className='App'>
          <div style={{ display: 'flex' }} className='container'>
            <Switch>
              <Route exact path='/'>
                <ServerList />
                <MainServerContainer />
              </Route>
              <Route path='/channels/:serverId/:channelId'>
                <ServerList />
                <MainServerContainer />
              </Route>
              <Route>
                <Redirect to='/channels/welcome/1' />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ServerState>
  );
};

export default Home;
