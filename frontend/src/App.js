import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { IntlProvider } from "react-intl";
import en from "./languages/en.json";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Landing from "./views/landing";
import login from "./views/login";
import signup from "./views/signup";
import dashboard from "./views/dashboard";
import practice from "./views/practice";
import sandbox from "./views/sandbox";

function App() {
	return (
		<ChakraProvider>
			<IntlProvider locale="en" messages={en}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Landing} />
					</Switch>
					<Switch>
						<Route exact path="/signup" component={signup} />
					</Switch>
					<Switch>
						<Route exact path="/login" component={login} />
					</Switch>
          {localStorage.getItem("uid") &&
					<Switch>
						<Route exact path="/dashboard" component={dashboard} />
					</Switch>}
          {localStorage.getItem("uid") &&
					<Switch>
						<Route exact path="/practice" component={practice} />
					</Switch>}
          {localStorage.getItem("uid") &&
          <Switch>
          <Route exact path="/sandbox" component={sandbox} />
          </Switch>}
          {!localStorage.getItem("uid") &&
          <Switch>
						<Redirect to={'/login'} />
					</Switch>
          }
				</BrowserRouter>
			</IntlProvider>
		</ChakraProvider>
	);
}

export default App;
