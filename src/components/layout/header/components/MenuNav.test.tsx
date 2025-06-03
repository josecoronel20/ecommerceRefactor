import { render, screen } from '@testing-library/react';
import MenuNav from './MenuNav';
import userEvent from '@testing-library/user-event';
//
// Mock de useRouter más completo
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// Mock de next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        mockRouter.push(href);
      }}
    >
      {children}
    </a>
  ),
}));

describe('MenuNav', () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it('should render the menu nav', () => {
    render(<MenuNav />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
  });

  it('should redirect to the home page when the link is clicked', async () => {
    render(<MenuNav />);
    const link = screen.getByText('Inicio');
    const user = userEvent.setup();
    await user.click(link);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('should redirect to the products page when the link is clicked', async () => {
    render(<MenuNav />);
    const link = screen.getByText('Productos');
    const user = userEvent.setup();
    await user.click(link);
    expect(mockRouter.push).toHaveBeenCalledWith('/productos');
  });
});
