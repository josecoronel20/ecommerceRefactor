import { render, screen } from '@testing-library/react';
import Header from './Header';
import userEvent from '@testing-library/user-event';

// Mock de useRouter y usePathname
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

const mockPathname = '/';

// Mock unificado de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
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

// Mock de useUserInfo
jest.mock('@/hooks/useUserInfo', () => ({
  __esModule: true,
  default: () => ({
    userInfo: null,
    isLoading: false,
    error: null,
  }),
}));

describe('Header', () => {
  it('should render the header', () => {
    render(<Header />);
    expect(screen.getByText('Violet Shop')).toBeInTheDocument();
  });

  it('should redirect to the home page when the link is clicked', async () => {
    render(<Header />);
    const link = screen.getByText('Violet Shop');
    const user = userEvent.setup();
    await user.click(link);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
