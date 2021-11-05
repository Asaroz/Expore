import { useState } from 'react';
import Login from './components/Login';
import Menu from './components/Menu';
import './App.css';

function App() {
  	const [user, setUser] = useState();

	return (
		<div className="App">
			<header className="App-header">
				{user ? 
					<Menu /> 
					:
					<Login setUser={setUser} 
				/>}
			</header>
		</div>
	);
}

export default App;
