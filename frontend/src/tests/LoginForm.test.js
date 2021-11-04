import { render, screen } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

beforeEach(() => {
  render(<LoginForm title="Test"/>)
})

test('Shows email correctly', () => {
  const EmailElement = screen.getByText("Email address");
  expect(EmailElement).toBeInTheDocument();
})

test('Shows password correctly', () => {
  const PasswordElement = screen.getByText("Password");
  expect(PasswordElement).toBeInTheDocument();
})