import { render, screen } from '@testing-library/react';
import SignUpForm from '../components/SignUpForm';


beforeEach(() => {
  render(<SignUpForm title="Test"/>)
})

test('Shows email correctly', () => {
  const EmailElement = screen.getByText("Email address");
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