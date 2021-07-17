import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import * as Routes from "./constants/routes";
import UserContextProvider from "./contexts/user";

const Landing = lazy(() => import("./pages/Landing"));
const MainLayout = lazy(() => import("./pages/MainLayout"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
	return (
		<UserContextProvider>
			<div className="App">
				<Router>
					<Suspense fallback={<Loader />}>
						<Switch>
							<Route exact path={Routes.DEFAULT} component={Landing} />
							<Route exact path={Routes.LOGIN} component={Login} />
							<Route exact path={Routes.REGISTER} component={Register} />
							<Route
								exact
								path={Routes.HOME}
								component={() => <MainLayout showFeed />}
							/>
							<Route
								path={Routes.SEARCH}
								component={() => <MainLayout showSearchResults />}
							/>
							<Route
								exact
								path={Routes.PROFILE}
								component={() => <MainLayout showProfile />}
							/>
						</Switch>
					</Suspense>
				</Router>
			</div>
		</UserContextProvider>
	);
}

export default App;
