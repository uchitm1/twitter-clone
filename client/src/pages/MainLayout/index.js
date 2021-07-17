import React from "react";
import { useLocation } from "react-router-dom";
import Feed from "../../components/Feed";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import WhatsHappening from "../../components/WhatsHappening";
import "./styles.scss";

function MainLayout(props) {
	const location = useLocation();
	const searchParams = Object.fromEntries(
		new URLSearchParams(location.search).entries()
	);
	return (
		<div className="main">
			<Sidebar />
			{props.showFeed && <Feed />}
			{props.showSearchResults && <SearchResults query={searchParams.q} />}
			{props.showProfile && <Profile />}
			<div className="rightSection">
				<SearchBar />
				<WhatsHappening />
			</div>
		</div>
	);
}

export default MainLayout;
