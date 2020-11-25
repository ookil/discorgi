import '../App.scss';
import MainServerContainer from '../components/messages/MainServerContainer';
import ServerList from '../components/servers/ServerList';
import ServerState from '../context/ServerState';

const Home = () => {
  return (
    <ServerState>
      <div className='App'>
        <div style={{ display: 'flex' }} className='container'>
          <ServerList />
          <MainServerContainer />
        </div>
      </div>
    </ServerState>
  );
};

export default Home;
