import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AvatarComponent from './AvatarComponent';
import '@testing-library/jest-dom';
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

const mockUserInfo = {
  id: 1,
  user: 'jose',
  email: 'josecoronel20@outlook.com',
  password: '1234',
  nickname: 'aaa',
  purchases: [
    {
      id: '1748008003626',
      date: '2025-05-23T13:46:43.626Z',
      products: [
        {
          id: 2,
          title: 'Microsoft Xbox X/S Wireless Controller Robot White',
          price: 57,
          quantity: 1,
        },
      ],
      total: 57,
    },
    {
      id: '1748008020484',
      date: '2025-05-23T13:47:00.484Z',
      products: [
        {
          id: 3,
          title:
            'Logitech G733 Lightspeed Wireless Gaming Headset with Suspension Headband, LIGHTSYNC RGB, Blue VO!CE mic Technology and PRO-G Audio Drivers - White',
          price: 384,
          quantity: 1,
        },
        {
          id: 4,
          title:
            'Sony WH-1000XM5 Wireless Industry Leading Active Noise Cancelling Headphones, 8 Mics for Clear Calling, 30Hr Battery, 3 Min Quick Charge = 3 Hours Playback, Multi Point Connectivity, Alexa-Silver',
          price: 362,
          quantity: 1,
        },
        {
          id: 5,
          title:
            "Urbanista Los Angeles Sand Gold - World's 1st Solar Powered Hybrid Active Noise Cancelling with Mic Premium Wireless Headphones, Unlimited Playtime",
          price: 265,
          quantity: 1,
        },
      ],
      total: 1011,
    },
  ],
};

// Mock useUserInfo
const mockUseUserInfo = jest.fn();

jest.mock('@/hooks/useUserInfo', () => ({
  __esModule: true,
  default: () => mockUseUserInfo(),
}));

describe('AvatarComponent', () => {
  beforeEach(() => {
    // Resetear el mock antes de cada test
    mockUseUserInfo.mockReset();
  });

  it('renders without crashing', () => {
    mockUseUserInfo.mockReturnValue({
      userInfo: null,
      isLoading: false,
      error: null,
    });
    render(<AvatarComponent />);
    expect(screen.getByTestId('DropdownMenuTrigger')).toBeInTheDocument();
  });

  it('shows login option when clicked', async () => {
    mockUseUserInfo.mockReturnValue({
      userInfo: null,
      isLoading: false,
      error: null,
    });

    render(<AvatarComponent />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('DropdownMenuTrigger');
    await user.click(trigger);

    // Verificamos que el trigger cambió su estado
    await waitFor(() => {
      expect(screen.getByTestId('DropdownMenuContent')).toBeInTheDocument();
    });
  });

  it("shows 'Iniciar sesión' when user is not logged in", async () => {
    mockUseUserInfo.mockReturnValue({
      userInfo: null,
      isLoading: false,
      error: null,
    });

    render(<AvatarComponent />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('DropdownMenuTrigger');
    await user.click(trigger);

    expect(screen.getByText('Iniciar sesión.')).toBeInTheDocument();
  });

  it("shows 'Cerrar sesión' and 'Perfil' when user is logged in", async () => {
    mockUseUserInfo.mockReturnValue({
      userInfo: mockUserInfo,
      isLoading: false,
      error: null,
    });

    render(<AvatarComponent />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('DropdownMenuTrigger');
    await user.click(trigger);

    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    expect(screen.getByText('Ver perfil')).toBeInTheDocument();
  });

  it("redirects to login page when 'Iniciar sesión' is clicked", async () => {
    mockUseUserInfo.mockReturnValue({
      userInfo: null,
      isLoading: false,
      error: null,
    });

    render(<AvatarComponent />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('DropdownMenuTrigger');
    await user.click(trigger);

    expect(screen.getByText('Iniciar sesión.')).toBeInTheDocument();
    const loginButton = screen.getByText('Iniciar sesión.');

    await user.click(loginButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it("redirects to profile page when 'Perfil' is clicked", async () => {
    mockUseUserInfo.mockReturnValue({
      userInfo: mockUserInfo,
      isLoading: false,
      error: null,
    });

    render(<AvatarComponent />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('DropdownMenuTrigger');
    await user.click(trigger);

    const profileButton = screen.getByText('Ver perfil');

    expect(profileButton).toBeInTheDocument();

    await user.click(profileButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/profile');
  });

  it("redirects to login page when 'Cerrar sesión' is clicked", async () => {
    mockUseUserInfo.mockReturnValue({
      userInfo: mockUserInfo,
      isLoading: false,
      error: null,
    });

    render(<AvatarComponent />);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('DropdownMenuTrigger');
    await user.click(trigger);

    const logoutButton = screen.getByText('Cerrar sesión');

    expect(logoutButton).toBeInTheDocument();

    await user.click(logoutButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
});
