import { useState } from 'react';
import Login from './components/Login';
import Menu from './components/Menu';
import './App.css';

function App() {
  	const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
	const [token, setToken] = useState(localStorage.getItem('authToken'));

	localStorage.setItem('authToken', token);
	localStorage.setItem('userEmail', userEmail);

	return (
		<div className="App">
			<header className="App-header">
				{(userEmail !== "null") ? 
					<Menu /> 
					:
					<Login setUserEmail={setUserEmail} setToken={setToken} 
				/>}
			</header>
		</div>
	);
}

export default App;
