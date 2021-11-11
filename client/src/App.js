import { useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import Login from './components/Login';
import UserMenu from './components/UserMenu';
import Register from './components/Register';
import './App.css';

function App() {
  	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	localStorage.setItem('user', JSON.stringify(user));

	return (
		<div className="App">
			<header className="App-header">
				{(user === "null" | (!user)) ? 
					<div>
						<div>
							<NavLink to="login">Login</NavLink>
							<NavLink to="register">Register</NavLink>
						</div>
						<Switch>
							<Route path='/login' component={() => <Login setUser={setUser}/>}/>
							<Route path='/register' component={() => <Register setUser={setUser}/>}/>
							<Route path='*'>
								<Redirect to="/login" />
							</Route>
						</Switch>
					</div>
					:
					<Switch>
						<Route path='*'>
							<Redirect to="/" />
							<UserMenu user={user} setUser={setUser}/>
						</Route>
					</Switch>
				}
			</header>
		</div>
	);
}

export default App;
