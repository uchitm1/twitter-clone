import React from "react";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.scss";

function Landing() {
	return (
		<div className="landing">
			<div className="coverImage">
				<img
					src="https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png"
					alt="cover-img"
				/>
				<FaTwitter />
			</div>
			<div className="joinSection">
				<FaTwitter size={50} />
				<h1>Happening now</h1>
				<h3>Join Twitter today.</h3>
				<Link to="/register">
					<button className="signupButton">Sign up</button>
				</Link>
				<Link to="/login">
					<button className="loginButton">Log in</button>
				</Link>
			</div>
		</div>
	);
}

export default Landing;
