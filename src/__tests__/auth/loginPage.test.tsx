import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../app/(auth)/login/page';
import { authApi } from '@/lib/api/auth';

// Mock de router
const mockRouter = { push: jest.fn() };
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: jest.fn(),
}));

// Mock de authApi
jest.mock('@/lib/api/auth');

const mockLogin = authApi.login as jest.Mock;

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente', () => {
    render(<Login />);
    expect(screen.getByText('Inicia sesión para continuar comprando')).toBeInTheDocument();
  });

  it('debería mostrar mensaje de error con credenciales inválidas', async () => {
    mockLogin.mockRejectedValueOnce({
      error: 'Usuario o contraseña incorrectos',
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Usuario'), 'usuarioInvalido');
    await user.type(screen.getByPlaceholderText('Contraseña'), 'passwordInvalido');
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => {
      expect(screen.getByText('Usuario o contraseña incorrectos')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('debería redirigir al home si el login es exitoso', async () => {
    mockLogin.mockResolvedValueOnce({
      message: 'Login exitoso',
      user: { id: 1, name: 'test' },
      token: '1234567',
    });

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Usuario'), 'test');
    await user.type(screen.getByPlaceholderText('Contraseña'), '1234567');
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });
});
