import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import appStrings from '../i18n/languages';

/**
 * Wrapper used to wrap components in a Router, used to test history functionality
 * @param {*} history 
 * @returns 
 */


export const renderInRouter = (history) => (Comp) =>
  render(
  <IntlProvider locale={'en'} messages={appStrings['en']}>
  <Router history={history}>
      <Comp type="loginMenu" />
    </Router>
  </IntlProvider>
  );

const history = createMemoryHistory({ initialEntries: ['/']})
  beforeEach(() => {
    const routerRender = renderInRouter(history);
    routerRender(NavBar);
  });
  
test('renders the logo correctly', () => {
  const linkElement = screen.getByLabelText("Acente Logo");
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  expect(history.location.pathname).toBe('/en/');
});

test('Handles Login click correctly', () => {

  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  expect(history.location.pathname).toBe('/en/login');

})


test('Handles Signup Click correctly', () => {
    const linkElement = screen.getByText("Sign up");
    expect(linkElement).toBeInTheDocument();
    linkElement.click();
    expect(history.location.pathname).toBe('/en/signup');
})