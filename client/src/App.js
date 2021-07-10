import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import * as Routes from "./constants/routes";
import UserContextProvider from "./contexts/user";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
	// const [loggedInUser, setLoggedInUser] = useState({});

	// const currentUser = async () => {
	// 	await apis
	// 		.getLoggedInUser()
	// 		.then((res) => {
	// 			console.log("Logged in user - " + JSON.stringify(res.data.user));
	// 			setLoggedInUser(res.data.user);
	// 		})
	// 		.catch((err) => console.error(err.response.data));
	// };

	// useEffect(() => {
	// 	currentUser();
	// }, []);

	return (
		<UserContextProvider>
			<div className="App">
				<Router>
					<Suspense fallback={<Loader />}>
						<Switch>
							<Route exact path={Routes.HOME} component={Home} />
							<Route exact path={Routes.LOGIN} component={Login} />
							<Route exact path={Routes.REGISTER} component={Register} />
						</Switch>
					</Suspense>
				</Router>
			</div>
		</UserContextProvider>
	);
}

export default App;
