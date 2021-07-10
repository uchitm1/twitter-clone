import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import apis from "../../api";
import Tweet from "../Tweet";
import { HiOutlineSparkles } from "react-icons/hi";
import {
	AiOutlinePicture,
	AiOutlineGif,
	AiOutlineSchedule,
} from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { GrEmoji } from "react-icons/gr";
import { UserContext } from "../../contexts/user";

function Feed() {
	const [tweet, setTweet] = useState("");
	const [allTweets, setAllTweets] = useState([]);
	const { loggedInUser } = useContext(UserContext);

	const isInvalid = tweet === "";

	const getAllTweets = async () => {
		await apis
			.fetchAllTweets()
			.then((res) => {
				setAllTweets(res.data.tweets);
			})
			.catch((err) => console.error(err.message));
	};

	const handleSubmit = async () => {
		const tweetInfo = {
			user: loggedInUser,
			content: tweet,
		};
		await apis
			.createTweet(tweetInfo)
			.then(() => {
				setTweet("");
				getAllTweets();
			})
			.catch((err) => console.error(err.response));
	};

	useEffect(() => {
		document.title = "Home / Twitter";
		getAllTweets();
	}, []);

	return (
		<div className="feed">
			<div className="header">
				<p>Home</p>
				<HiOutlineSparkles size={23} />
			</div>
			<div className="createTweet">
				<img
					src={
						loggedInUser.imageUrl
							? loggedInUser.imageUrl
							: "/assets/default-dp.jpg"
					}
					alt="profile-pic"
					width={50}
					height={50}
				/>
				<div className="tweetInputField">
					<textarea
						value={tweet}
						onChange={(e) => setTweet(e.target.value)}
						maxLength={255}
						placeholder="What's happening?"
					></textarea>
					<div className="tweetOptions">
						<div className="tweetOptionsIcons">
							<AiOutlinePicture size={25} />
							<AiOutlineGif size={25} />
							<BiPoll size={25} />
							<GrEmoji size={25} />
							<AiOutlineSchedule size={25} />
						</div>
						<button
							disabled={isInvalid}
							className={!isInvalid ? "active" : ""}
							onClick={handleSubmit}
						>
							Tweet
						</button>
					</div>
				</div>
			</div>
			<div className="emptySpace"></div>
			{allTweets.map((tweet) => (
				<Tweet key={tweet._id} tweet={tweet} />
			))}
		</div>
	);
}

export default Feed;
