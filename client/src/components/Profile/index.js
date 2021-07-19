import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import "./styles.scss";
import { BiArrowBack } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import * as Routes from "../../constants/routes";
import apis from "../../api";
import Tweet from "../Tweet";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function Profile() {
	const { loggedInUser } = useContext(UserContext);
	const [tweetsByUsername, setTweetsByUsername] = useState([]);

	const getTweetsByUsername = async () => {
		await apis
			.fetchTweetsByUsername(loggedInUser.username)
			.then((res) => {
				setTweetsByUsername(res.data.tweets);
			})
			.catch((err) => console.error(err.message));
	};

	useEffect(() => {
		getTweetsByUsername();
	}, []);

	return (
		<div className="profile">
			<div className="header">
				<Link to={Routes.HOME}>
					<BiArrowBack size={20} />
				</Link>
				<div>
					<p>{loggedInUser.fullName}</p>
					<p className="no_of_tweets">
						{tweetsByUsername.length !== 1
							? tweetsByUsername.length + " Tweets"
							: tweetsByUsername.length + " Tweet"}
					</p>
				</div>
			</div>
			<div className="cover_image"></div>
			<div className="profile_picture">
				<img
					src={
						loggedInUser.imageUrl
							? loggedInUser.imageUrl
							: "/assets/default-dp.jpg"
					}
					alt="profile-pic"
				/>
			</div>
			<div className="edit_profile_button">
				<button>Edit Profile</button>
			</div>
			<div className="about_user_section">
				<p className="user_fullname">{loggedInUser.fullName}</p>
				<p className="user_username">@{loggedInUser.username}</p>
				<div className="user_location_dob_joined">
					{loggedInUser.location && (
						<div className="user_location">
							<IoLocation />
							<p>{loggedInUser.location}</p>
						</div>
					)}
					{loggedInUser.birthday && (
						<div className="user_birthday">
							<FaBirthdayCake />
							<p>
								Born {format(new Date(loggedInUser.birthday), "MMMM dd, yyyy")}
							</p>
						</div>
					)}
					<div className="user_joining_date">
						<BsCalendar />
						<p>
							Joined {format(new Date(loggedInUser.createdAt), "MMMM yyyy")}
						</p>
					</div>
				</div>
				<div className="following_followers">
					<p className="following">
						<span>{loggedInUser.following.length}</span> Following
					</p>
					<p className="followers">
						<span>{loggedInUser.followers.length}</span> Followers
					</p>
				</div>
			</div>
			<div className="profile_navbar">
				<ul className="navbar_items">
					<li className="active">Tweets</li>
					<li>Tweets & replies</li>
					<li>Media</li>
					<li>Likes</li>
				</ul>
			</div>
			{tweetsByUsername.map((tweet) => (
				<Tweet key={tweet._id} tweet={tweet} />
			))}
		</div>
	);
}

export default Profile;
