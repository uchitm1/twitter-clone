import React, { useEffect, useState } from "react";
import Tweet from "../../components/Tweet";
import apis from "../../api";
import "./styles.scss";

function SearchResults(props) {
	const [tweetsBySearchedUsername, setTweetsBySearchedUsername] = useState([]);
	const searchedUsername = props.query;
	const getSearchResults = async () => {
		await apis
			.fetchTweetsBySearchedUsername(searchedUsername)
			.then((res) => setTweetsBySearchedUsername(res.data.tweets))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getSearchResults();
	}, [searchedUsername]);
	return (
		<div className="search_results">
			<div className="navbar">
				<ul className="navbar_items">
					<li className="active">Top</li>
					<li>Latest</li>
					<li>People</li>
					<li>Photos</li>
					<li>Videos</li>
				</ul>
			</div>
			<div className="empty_space"></div>
			{tweetsBySearchedUsername.length > 0 ? (
				tweetsBySearchedUsername.map((tweet) => (
					<Tweet key={tweet._id} tweet={tweet} />
				))
			) : (
				<div className="no_search_results">
					<h2>No results for "{searchedUsername}"</h2>
					<p>
						The term you entered did not bring up any results. You may have
						mistyped your term or your Search settings could be protecting you
						from some potentially sensitive content.
					</p>
				</div>
			)}
		</div>
	);
}

export default SearchResults;
