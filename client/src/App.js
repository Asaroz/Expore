import React , { useContext, useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import Login from './components/Login';
import UserMenu from './components/UserMenu';
import Register from './components/Register';
import './App.css';
import useUserContext from './contexts/useUserContext';

export const UserContext = React.createContext()


function App(props) {
	const [user,setUser] = useUserContext('user')

	/* 
  	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	localStorage.setItem('user', JSON.stringify(user)); */

	return (
		<div className="App">
			<UserContext.Provider value={[user,setUser]}>
				<header className="App-header">
					{(!props.user) ? 
						<div>
							<div>
								<NavLink to="login">Login</NavLink>
								<NavLink to="register">Register</NavLink>
							</div>
							<Switch>
								<Route path='/login' component={() => <Login />}/>
								<Route path='/register' component={() => <Register />}/>
								<Route path='*'>
									<Redirect to="/login" />
								</Route>
							</Switch>
						</div>
						:
						<Switch>
							<Route path='*'>
								<Redirect to="/" />
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
