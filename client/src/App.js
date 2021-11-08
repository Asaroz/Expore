import { useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Register from './components/Register';
import './App.css';

function App() {
  	const [userName, setUserName] = useState(localStorage.getItem('userName'));
	const [token, setToken] = useState(localStorage.getItem('authToken'));

	localStorage.setItem('authToken', token);
	localStorage.setItem('userName', userName);

	return (
		<div className="App">
			<header className="App-header">
				{(userName === "null" | (!userName)) ? 
					<div>
						<div>
							<NavLink to="login">Login</NavLink>
							<NavLink to="register">Register</NavLink>
						</div>
						<Switch>
							<Route path='/login' component={() => <Login setUserName={setUserName} setToken={setToken}/>}/>
							<Route path='/register' component={() => <Register setUserName={setUserName} setToken={setToken}/>}/>
							<Route path='*'>
								<Redirect to="/login" />
							</Route>
						</Switch>
					</div>
					:
					<Menu userName={userName} setUserName={setUserName} setToken={setToken}/> 
				}
			</header>
		</div>
	);
}

export default App;
