import React from "react";
import "./styles.scss";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiUpload } from "react-icons/fi";
import { CgMoreAlt } from "react-icons/cg";

function Tweet(props) {
	return (
		<div className="tweet">
			<img src="" alt="profile-pic" width={50} height={50} />
			<div className="tweetInfo">
				<p className="userInfo">
					<span>{props.tweet.user.fullName}</span>@{props.tweet.user.username}
				</p>
				<p className="tweetContent">{props.tweet.content}</p>
				<div className="tweetOptionsIcons">
					<div className="replies">
						<FiMessageSquare size={18} />
						<p>{props.tweet.likes}</p>
					</div>
					<div className="retweets">
						<AiOutlineRetweet size={18} />
						<p>{props.tweet.likes}</p>
					</div>
					<div className="likes">
						<AiOutlineHeart size={18} />
						<p>{props.tweet.likes}</p>
					</div>
					<div className="shares">
						<FiUpload size={18} />
					</div>
				</div>
			</div>
			<CgMoreAlt size={20} className="moreOptions" />
		</div>
	);
}

export default Tweet;
