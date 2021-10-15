import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

/**
 * Wrapper used to wrap components in a Router, used to test history functionality
 * @param {*} history 
 * @returns 
 */
export const renderInRouter = (history) => (Comp) =>
  render(<Router history={history}>
      <Comp />
    </Router>
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
  expect(history.location.pathname).toBe('/');
});

test('Handles Login click correctly', () => {

  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  expect(history.location.pathname).toBe('/login');

})


test('Handles Signup Click correctly', () => {
    const linkElement = screen.getByText("Sign Up");
    expect(linkElement).toBeInTheDocument();
    linkElement.click();
    expect(history.location.pathname).toBe('/signup');
})