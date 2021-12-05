import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import appStrings from '../i18n/languages';
import LoginForm from '../components/LoginForm';

beforeEach(() => {
  render(<IntlProvider locale={'en'} messages={appStrings['en']}>
  <LoginForm title="Test"/>)
  </IntlProvider>
)})

test('Shows email correctly', () => {
  const EmailElement = screen.getByText("Email Address");
  expect(EmailElement).toBeInTheDocument();
})

test('Shows password correctly', () => {
  const PasswordElement = screen.getByText("Password");
  expect(PasswordElement).toBeInTheDocument();
})