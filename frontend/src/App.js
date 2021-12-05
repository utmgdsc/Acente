import "./App.css";
import { React, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Redirect } from "react-router-dom";
import { LanguageRouter } from "./i18n/components/LanguageRouter";
import { LocalizedSwitch } from "./i18n/components/LocalizedSwitch";
import Landing from "./views/landing";
import Login from "./views/login";
import Signup from "./views/signup";
import Dashboard from "./views/dashboard";
import Practice from "./views/practice";
import Sandbox from "./views/sandbox";

function App() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		setLoggedIn(localStorage.getItem("username") !== null);
	}, [localStorage.getItem("username")]);
	return (
		<ChakraProvider>
			<LanguageRouter>
				<LocalizedSwitch>
					<Route exact path="/" component={Landing} />
					<Route
						exact
						path="/signup"
						render={(props) => (
							<Signup {...props} updateUsername={setLoggedIn} />
						)}
					/>
					<Route
						exact
						path="/login"
						render={(props) => (
							<Login {...props} updateUsername={setLoggedIn} />
						)}
					/>
					{isLoggedIn && (
						<Route exact path="/dashboard" component={Dashboard} />
					)}
					{isLoggedIn && (
						<Route exact path="/practice" component={Practice} />
					)}
					{isLoggedIn && (
						<Route exact path="/sandbox" component={Sandbox} />
					)}
					{!isLoggedIn && <Redirect to={"/login"} />}
				</LocalizedSwitch>
			</LanguageRouter>
		</ChakraProvider>
	);
}

export default App;
