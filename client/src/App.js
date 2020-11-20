import './App.scss';
import ChannelsList from './components/channels/ChannelsList';
import MainServerContainer from './components/messages/MainServerContainer';
import ServerList from './components/servers/ServerList';
import ServerState from './context/ServerState';

function App() {
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
}

export default App;
