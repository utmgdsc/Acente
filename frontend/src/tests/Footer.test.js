import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders Copyright information', () => {
  render(<Footer />);
  const linkElement = screen.getByText("Copyright © Acenté 2021 | All rights reserved");
  expect(linkElement).toBeInTheDocument();
});
