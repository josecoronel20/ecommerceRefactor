import { render, screen, waitFor } from '@testing-library/react';
import Register from '../../app/(auth)/register/page';
import { userEvent } from '@testing-library/user-event';
import { authApi } from '@/lib/api/auth';

// Mock de authApi
jest.mock('@/lib/api/auth');

const mockRouter = { push: jest.fn() };

const mockRegister = authApi.register as jest.Mock;

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: jest.fn(),
}));

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the register page', () => {
    render(<Register />);
    expect(screen.getByText('Registrate para continuar comprando')).toBeInTheDocument();
  });

  it('should redirect to the login page if the register is successful', async () => {
    mockRegister.mockResolvedValueOnce({
      ok: true,
    });

    render(<Register />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Usuario'), 'test');
    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Contraseña'), '1234567');
    await user.click(screen.getByRole('button', { name: 'registrarse' }));

    // Esperar a que se muestre el diálogo de éxito
    await waitFor(() => {
      expect(screen.getByText('Te registraste correctamente')).toBeInTheDocument();
    });

    // Esperar a que se complete la redirección
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    }, { timeout: 3000 });
  });
});
