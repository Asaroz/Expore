import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import Login from './components/Login';
import UserMenu from './components/UserMenu';
import Register from './components/Register';
import UniversePage from './components/UniversePage';
import './App.css';
import useUserContext from './contexts/useUserContext';
import UserContext from './contexts/UserContext';

function App() {

	const [ user, setUser ] = useUserContext('user');

	return (
		<div className="App">
			<UserContext.Provider value={[user,setUser]}>
				<header className="App-header">
					{(!user) ? 
						<div>
							<div>
								<NavLink to='login'>Login</NavLink>
								<NavLink to='register'>Register</NavLink>
							</div>
							<Switch>
								<Route path='/login' component={() => <Login />}/>
								<Route path='/register' component={() => <Register />}/>
								<Route path='*'>
									<Redirect to='/login' />
								</Route>
							</Switch>
						</div>
						:
						<Switch>
							<Route path='/universe' component={() => <UniversePage />} />
							<Route path='/' component={() => <UserMenu />} />
							<Route path='*'>
								<Redirect to='/' />
								<UserMenu/>
							</Route>
						</Switch>
					}
				</header>
			</UserContext.Provider>
		</div>
	);
}

export default App;
