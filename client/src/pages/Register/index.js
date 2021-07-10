import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import apis from "../../api";
import * as Routes from "../../constants/routes";
import "./styles.scss";

function Register() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");

	const isInvalid =
		email === "" || password === "" || username === "" || fullName === "";

	const handleSubmit = (e) => {
		e.preventDefault();
		const registerUserDetails = {
			email,
			username,
			password,
			fullName,
		};
		setEmail("");
		setUsername("");
		setPassword("");
		setFullName("");
		apis
			.createUser(registerUserDetails)
			.then(() => {
				history.push(Routes.HOME);
			})
			.catch((err) => window.alert(err.response.data.errors.body));
	};

	useEffect(() => {
		document.title = "Sign Up for Twitter / Twitter";
	}, []);

	return (
		<div className="register">
			<form onSubmit={handleSubmit} method="POST">
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				></input>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				></input>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				></input>
				<input
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					placeholder="Full Name"
				></input>
				<button disabled={isInvalid} type="submit">
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default Register;
