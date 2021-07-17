import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
					<Link to={Routes.HOME}>
						<FaTwitter size={40} />
					</Link>
				</li>
				<li>
					<Link to={Routes.HOME}>
						<FaHome size={25} />
						<span>Home</span>
					</Link>
				</li>
				<li>
					<Link to={Routes.EXPLORE}>
						<FaHashtag size={25} />
						<span>Explore</span>
					</Link>
				</li>
				<li>
					<Link to={Routes.NOTIFICATIONS}>
						<FaBell size={25} />
						<span>Notifications</span>
					</Link>
				</li>
				<li>
					<Link to={Routes.MESSAGES}>
						<FaEnvelope size={25} />
						<span>Messages</span>
					</Link>
				</li>
				<li>
					<Link
						to={{
							pathname: `/${loggedInUser.username}`,
						}}
					>
						<IoPerson size={25} />
						<span>Profile</span>
					</Link>
				</li>
				<li>
					<Link to={Routes.DEFAULT}>
						<CgMoreO size={25} />
						<span>More</span>
					</Link>
				</li>
			</ul>
			<button>Tweet</button>
			<div
				onClick={handleLogout}
				className={showLogout ? "logout show" : "logout"}
			>
				<p>Log out @{loggedInUser.username}</p>
			</div>
			<div
				className="userInfo"
				onClick={() => setShowLogout((state) => !state)}
			>
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
