import React, { useEffect, useState } from "react";
import Tweet from "../../components/Tweet";
import apis from "../../api";
import "./styles.scss";
import People from "../People";

function SearchResults(props) {
	const [tweetsBySearchedUsername, setTweetsBySearchedUsername] = useState([]);
	const [matchingAccounts, setMatchingAccounts] = useState([]);
	const searchedTerm = props.query;
	const getSearchResults = async () => {
		await apis
			.fetchSearchResults(searchedTerm)
			.then((res) => {
				setTweetsBySearchedUsername(res.data.tweets);
				setMatchingAccounts(res.data.matchingAccounts);
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getSearchResults();
	}, [searchedTerm]);
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

			{matchingAccounts.length > 0 && (
				<>
					<div className="header">
						<p>People</p>
					</div>
					{matchingAccounts.map((account) => (
						<People key={account._id} account={account} />
					))}
					<div className="empty_space"></div>
				</>
			)}
			{tweetsBySearchedUsername.length > 0 && (
				<>
					<div className="header">
						<p>Tweets</p>
					</div>
					{tweetsBySearchedUsername.map((tweet) => (
						<Tweet key={tweet._id} tweet={tweet} />
					))}
				</>
			)}
			{matchingAccounts.length <= 0 && tweetsBySearchedUsername.length <= 0 && (
				<div className="no_search_results">
					<h2>No results for "{searchedTerm}"</h2>
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
