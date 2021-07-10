import React, { useState, useEffect, useContext } from "react";
import { FaTwitter } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import apis from "../../api";
import * as Routes from "../../constants/routes";
import { UserContext } from "../../contexts/user";
import "./styles.scss";

function Register() {
	const history = useHistory();
	const { currentUser } = useContext(UserContext);
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
			<FaTwitter size={40} />
			<h1>Sign up for Twitter</h1>
			<form onSubmit={handleSubmit} method="POST">
				<div className="email">
					<label htmlFor="emailInputField">Email</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						id="emailInputField"
					></input>
				</div>
				<div className="username">
					<label htmlFor="usernameInputField">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						id="usernameInputField"
					></input>
				</div>
				<div className="password">
					<label htmlFor="passwordInputField">Password</label>
					<input
						type="password"
						id="passwordInputField"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<div className="fullName">
					<label htmlFor="fullNameInputField">Full Name</label>
					<input
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						id="fullNameInputField"
					></input>
				</div>

				<button
					className={!isInvalid ? "active" : ""}
					disabled={isInvalid}
					type="submit"
				>
					Sign Up
				</button>
			</form>
			<Link to="/login">
				<p className="loginLink">Log in to Twitter</p>
			</Link>
		</div>
	);
}

export default Register;
