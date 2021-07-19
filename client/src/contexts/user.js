import { createContext } from "react";
import apis from "../api";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", "");

	const currentUser = async () => {
		await apis
			.getLoggedInUser()
			.then((res) => {
				setLoggedInUser(res.data.user);
			})
			.catch((err) => console.error(err.response.data));
	};

	const removeUserFromContext = () => {
		setLoggedInUser({});
	};

	return (
		<UserContext.Provider
			value={{ loggedInUser, currentUser, removeUserFromContext }}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
