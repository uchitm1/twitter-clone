import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Routes from "../../constants/routes";
import "./styles.scss";

function SearchBar() {
	const [searchText, setSearchText] = useState("");
	const history = useHistory();

	const handleSubmit = (e) => {
		if (e.keyCode === 13) {
			history.push({
				pathname: Routes.SEARCH,
				search: `?q=${searchText}`,
			});
		}
	};

	return (
		<div className="searchBar">
			<input
				type="text"
				placeholder="Search Twitter"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onKeyDown={handleSubmit}
			></input>
		</div>
	);
}

export default SearchBar;
