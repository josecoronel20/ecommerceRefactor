import { render, screen } from '@testing-library/react';
import Register from './page';

const mockRouter = { push: jest.fn() };

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: jest.fn(),
}));

describe('Register', () => {
  it('should render the register page', () => {
    render(<Register />);

    expect(screen.getByText('Registrate para continuar comprando')).toBeInTheDocument();
  });
});
