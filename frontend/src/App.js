import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { IntlProvider } from 'react-intl';
import en from './languages/en.json';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from './views/landing';
import login from './views/login';
import signup from './views/signup';
import dashboard from './views/dashboard'

function App() {
  return (
    <ChakraProvider>
      <IntlProvider locale="en" messages = {en}>
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
        <Switch>
          <Route exact path="/dashboard" component={dashboard} />
        </Switch>
      </BrowserRouter>
      </IntlProvider>
		</ChakraProvider>
  );
}

export default App;
