import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../app/(auth)/login/page';

// Mock de router
const mockRouter = { push: jest.fn() };

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: jest.fn(),
}));

// Mock de apiUser
const mockLogin = jest.fn();
jest.mock('@/lib/apiUser', () => ({
  __esModule: true,
  login: () => mockLogin(),
}));

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente', () => {
    render(<Login />);
    expect(screen.getByText('Inicia sesión para continuar comprando')).toBeInTheDocument();
  });

  it('debería mostrar mensaje de error con credenciales inválidas', async () => {
    // Mock el error como un objeto en lugar de Error
    mockLogin.mockRejectedValueOnce({
      error: 'Usuario o contraseña incorrectos',
    });

    // Suprimir el console.error para este test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Usuario'), 'usuarioInvalido');
    await user.type(screen.getByPlaceholderText('Contraseña'), 'passwordInvalido');
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => {
      expect(screen.getByText('Usuario o contraseña incorrectos')).toBeInTheDocument();
    });

    // Restaurar console.error
    consoleSpy.mockRestore();
  });

  it('debería redirigir al home si el login es exitoso', async () => {
    mockLogin.mockResolvedValueOnce({
      user: { id: 1, name: 'test' },
      token: '1234567',
    });

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Usuario'), 'test');
    await user.type(screen.getByPlaceholderText('Contraseña'), '123456');
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });
});
