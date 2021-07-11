import React from "react";
import "./styles.scss";

function WhatsHappening() {
	return (
		<div className="whatsHappening">
			<div className="header">
				<p>What's Happening</p>
			</div>
			<div className="mainContent">
				<div className="content1">
					<p className="topic">Football · 3 hours ago</p>
					<p className="body">
						Argentina vs Brazil: Argentina defeats Brazil 1-0 to lift Copa
						América trophy
					</p>
					<p className="tags">Trending with Ronaldo, #Messi</p>
				</div>
				<div className="content2">
					<p className="topic">Sports · Trending</p>
					<p className="body">7th Ballon</p>
					<p className="tags">14.1K Tweets</p>
				</div>
				<div className="content3">
					<p className="topic">Sports · Trending</p>
					<p className="body">International Trophy</p>
					<p className="tags">117K Tweets</p>
				</div>
			</div>
		</div>
	);
}

export default WhatsHappening;
