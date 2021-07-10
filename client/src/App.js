import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
	return (
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
	);
}

export default App;
