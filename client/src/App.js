
import { useState } from 'react';
import './App.css';



function App() {
const [user,setUser] = useState()
user="yea"

  return (
    <div className="App">
      <header className="App-header">
        {user ?
          <Menu />
        :
          <Login setUser={setUser} />
        }
      </header>
    </div>
  );
}

export default App;
