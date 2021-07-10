import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import apis from "../../api";
import * as Routes from "../../constants/routes";
import "./styles.scss";
import { FaTwitter } from "react-icons/fa";
import { UserContext } from "../../contexts/user";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { currentUser } = useContext(UserContext);

	const isInvalid = email === "" || password === "";

	const handleSubmit = (e) => {
		e.preventDefault();
		const loginDetails = {
			email,
			password,
		};
		setEmail("");
		setPassword("");
		apis
			.loginUser(loginDetails)
			.then(() => {
				history.push(Routes.HOME);
			})
			.catch((err) => window.alert(err.response.data.errors.body));
	};

	useEffect(() => {
		document.title = "Login on Twitter / Twitter";
	}, []);

	return (
		<div className="login">
			<FaTwitter size={40} />
			<h1>Log in to Twitter</h1>
			<form onSubmit={handleSubmit} method="POST">
				<div className="email">
					<label htmlFor="emailInputField">Email</label>
					<input
						type="text"
						id="emailInputField"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
				<button
					className={!isInvalid ? "active" : ""}
					disabled={isInvalid}
					type="submit"
				>
					Login
				</button>
			</form>
			<Link to="/register">
				<p className="signupLink">Sign up for Twitter</p>
			</Link>
		</div>
	);
}

export default Login;
