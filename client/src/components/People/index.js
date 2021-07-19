import React, { useContext, useState } from "react";
import apis from "../../api";
import { UserContext } from "../../contexts/user";
import "./styles.scss";

function People(props) {
	const { loggedInUser } = useContext(UserContext);
	const { _id, fullName, username, imageUrl } = props.account;
	const [follow, setFollow] = useState(loggedInUser.following.includes(_id));

	const handleFollow = async () => {
		await apis
			.followUser(loggedInUser._id, _id)
			.then((res) => {
				if (res.data.success) {
					setFollow(true);
				}
			})
			.catch((err) => console.error(err));
	};

	const handleUnfollow = async () => {};

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
					{follow ? (
						<button className="following" onClick={handleUnfollow}>
							Following
						</button>
					) : (
						<button className="follow" onClick={handleFollow}>
							Follow
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default People;
