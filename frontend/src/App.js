import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { IntlProvider } from 'react-intl';
import en from './languages/en.json';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from './landing';
import login from './login';
import signup from './signup'

function App() {
  return (
    <ChakraProvider>
      <IntlProvider locale="en" messages = {en}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={login} />
        </Switch>
        <Switch>
          <Route exact path="/signup" component={signup} />
        </Switch>
        <Switch>
          <Route exact path="/login" component={login} />
        </Switch>
      </BrowserRouter>
      </IntlProvider>
		</ChakraProvider>
  );
}

export default App;
