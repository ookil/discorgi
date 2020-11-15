import './App.css';
import ChannelsList from './components/channels/ChannelsList';
import MainServerContainer from './components/messages/MainServerContainer';
import ServerList from './components/servers/ServerList';
import ServerState from './context/ServerState';

function App() {
  return (
    <ServerState>
      <div className='App'>
        {/* <h4 className="title">DISCORGI</h4> */}
        <div style={{ display: 'flex' }} className='container'>
          <ServerList />
          <ChannelsList />
          <MainServerContainer />
        </div>
      </div>
    </ServerState>
  );
}

export default App;
