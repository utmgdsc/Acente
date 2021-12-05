import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Redirect } from "react-router-dom";
import { LanguageRouter } from "./i18n/components/LanguageRouter";
import { LocalizedSwitch } from "./i18n/components/LocalizedSwitch";
import landing from "./views/landing";
import login from "./views/login";
import signup from "./views/signup";
import dashboard from "./views/dashboard";
import practice from "./views/practice";
import sandbox from "./views/sandbox";

function App() {
	return (
		<ChakraProvider>
				<LanguageRouter>
				<LocalizedSwitch>
						<Route exact path="/" component={landing} />
						<Route exact path="/signup" component={signup} />
						<Route exact path="/login" component={login} />
          {localStorage.getItem("uid") &&
						<Route exact path="/dashboard" component={dashboard} />}
          {localStorage.getItem("uid") &&
						<Route exact path="/practice" component={practice} />}
          {localStorage.getItem("uid") &&
          <Route exact path="/sandbox" component={sandbox} />}
          {!localStorage.getItem("uid") &&
						<Redirect to={'/login'} />
          }
					</LocalizedSwitch>
				</LanguageRouter>
		</ChakraProvider>
	);
}

export default App;
