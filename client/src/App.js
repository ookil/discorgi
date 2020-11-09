import './App.css';
import ServerList from './components/servers/ServerList';

function App() {
  return (
    <div className='App'>
      <h4 className="title">DISCORGI</h4>
      <div className='container'>
        <ServerList />
      </div>
    </div>
  );
}

export default App;
