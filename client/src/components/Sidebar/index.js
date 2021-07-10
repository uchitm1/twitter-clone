import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import {
	FaHome,
	FaHashtag,
	FaBell,
	FaEnvelope,
	FaTwitter,
} from "react-icons/fa";
import { CgMoreO, CgMoreAlt } from "react-icons/cg";
import { IoPerson } from "react-icons/io5";
import apis from "../../api";
import * as Routes from "../../constants/routes";
import { UserContext } from "../../contexts/user";

function Sidebar() {
	const history = useHistory();
	const { loggedInUser, currentUser, removeUserFromContext } =
		useContext(UserContext);
	const [showLogout, setShowLogout] = useState(false);

	const handleLogout = async () => {
		await apis
			.logoutUser()
			.then(() => {
				history.push(Routes.LOGIN);
				removeUserFromContext();
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		currentUser();
	}, []);

	return (
		<div className="sidebar">
			<ul>
				<li>
					<FaTwitter size={40} />
				</li>
				<li>
					<FaHome size={25} />
					<span>Home</span>
				</li>
				<li>
					<FaHashtag size={25} />
					<span>Explore</span>
				</li>
				<li>
					<FaBell size={25} />
					<span>Notifications</span>
				</li>
				<li>
					<FaEnvelope size={25} />
					<span>Messages</span>
				</li>
				<li>
					<IoPerson size={25} />
					<span>Profile</span>
				</li>
				<li>
					<CgMoreO size={25} />
					<span>More</span>
				</li>
			</ul>
			<button>Tweet</button>
			<div
				onClick={handleLogout}
				className={showLogout ? "logout show" : "logout"}
			>
				<p>Log out @{loggedInUser.username}</p>
			</div>
			<div className="profile" onClick={() => setShowLogout((state) => !state)}>
				<img
					src={
						loggedInUser.imageUrl
							? loggedInUser.imageUrl
							: "/assets/default-dp.jpg"
					}
					alt="profile-pic"
					width={40}
					height={40}
				/>
				<div className="userDetails">
					<p className="fullName">{loggedInUser.fullName}</p>
					<p className="username">@{loggedInUser.username}</p>
				</div>
				<CgMoreAlt size={20} />
			</div>
		</div>
	);
}

export default Sidebar;
