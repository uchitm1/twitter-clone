import React from "react";
import Feed from "../../components/Feed";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import WhatsHappening from "../../components/WhatsHappening";
import "./styles.scss";

function Home() {
	return (
		<div className="home">
			<Sidebar />
			<Feed />
			<div className="rightSection">
				<SearchBar />
				<WhatsHappening />
			</div>
		</div>
	);
}

export default Home;
