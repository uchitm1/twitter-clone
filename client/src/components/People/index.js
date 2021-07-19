import React, { useContext } from "react";
import { UserContext } from "../../contexts/user";
import "./styles.scss";

function People(props) {
	const { fullName, username, imageUrl } = props.account;
	const { loggedInUser } = useContext(UserContext);
	return (
		<div className="people">
			<img
				src={imageUrl ? imageUrl : "/assets/default-dp.jpg"}
				alt="profile-pic"
				width={50}
				height={50}
			/>
			<div className="user_info">
				<p className="user_fullname">{fullName}</p>
				<p className="user_username">@{username}</p>
			</div>
			{loggedInUser.username !== username && (
				<div className="follow_button">
					<button>Follow</button>
				</div>
			)}
		</div>
	);
}

export default People;
