import { render, screen } from '@testing-library/react';
import Form from '../components/Form';


beforeEach(() => {
  render(<Form title="Test"/>)
})
test('renders Form correctly', () => {
  const TestTitle = screen.getByText("Test");
  expect(TestTitle).toBeInTheDocument();
});

test('Shows email correctly', () => {
  const EmailElement = screen.getByText("Email address");
  expect(EmailElement).toBeInTheDocument();

})

test('Shows Username correctly', () => {
    const UsernameElement = screen.getByText("Username");
    expect(UsernameElement).toBeInTheDocument();
})