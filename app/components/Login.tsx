import React, {useState} from "react";
import {LoginType} from "../types/genericTypes"
import { fetchLogin } from '../utils/loginUtils';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const loginRequest = async (e)=> {
					e.preventDefault();
					const login : LoginType = await fetchLogin(username, password);
					console.log(login);
					// window.myAppLogin = login;
				};

	return (
		<div className="login container">
			LOGIN: 
			<br></br>
			<form className="login form"
				onSubmit={loginRequest}>
				<input
					type="text"
					className="login username"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}></input>
				<input
					type="password"
					className="login password"
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}></input>
				<input className="login submit" type="submit"></input>
			</form>
		</div>
	);
}

export default Login;