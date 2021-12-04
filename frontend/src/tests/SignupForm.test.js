import { render, screen } from '@testing-library/react';
import SignUpForm from '../components/SignUpForm';
import { IntlProvider } from 'react-intl';
import appStrings from '../i18n/languages';


beforeEach(() => {
  render(
    <IntlProvider locale={'en'} messages={appStrings['en']}>
    <SignUpForm title="Test"/>)
    </IntlProvider>
)});

test('Shows email correctly', () => {
  const EmailElement = screen.getByText("Email Address");
  expect(EmailElement).toBeInTheDocument();

})

test('Shows name correctly', () => {
    const NameElement = screen.getByText("Name");
    expect(NameElement).toBeInTheDocument();
})

test('Shows password correctly', () => {
  const PasswordElement = screen.getByText("Password");
  expect(PasswordElement).toBeInTheDocument();
})