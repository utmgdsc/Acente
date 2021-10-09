import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { IntlProvider } from 'react-intl';
import en from './languages/en.json';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from './landing';

function App() {
  return (
    <ChakraProvider>
      <IntlProvider locale="en" messages = {en}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
      </IntlProvider>
		</ChakraProvider>
  );
}

export default App;
