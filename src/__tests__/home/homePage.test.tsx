import { render, screen, act } from '@testing-library/react';
import Home from '../../app/page';
import userEvent from '@testing-library/user-event';

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

// Mock de useUserInfo
jest.mock('@/hooks/useUserInfo', () => ({
  __esModule: true,
  default: () => ({
    userInfo: null,
    isLoading: false,
    isError: false,
    mutate: jest.fn(),
  }),
  productFetcher: jest.fn().mockImplementation(() =>
    Promise.resolve({
      products: [],
    })
  ),
}));

// Mock de PopularProducts para evitar la llamada a useSWR
jest.mock('./componentsHome/PopularProducts', () => ({
  __esModule: true,
  default: () => <div>Productos destacados</div>,
}));

describe('Home', () => {
  it('should render the home page', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Descubre Productos Exclusivos')).toBeInTheDocument();
  });

  it('should render the popular products', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Productos destacados')).toBeInTheDocument();
  });

  it('should render the button', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Ver colección')).toBeInTheDocument();
  });

  it('should redirect to the products page when the button is clicked', async () => {
    await act(async () => {
      render(<Home />);
    });
    const button = screen.getByText('Ver colección');
    const user = userEvent.setup();
    await act(async () => {
      await user.click(button);
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/productos');
  });
});
