import { render, screen, waitFor } from '@testing-library/react';
import Profile from '../../app/profile/page';
import Cookies from 'js-cookie';
import { authApi } from '@/lib/api/auth';
import { userApi } from '@/lib/api/user';
import AvatarComponent from '@/components/layout/header/components/AvatarComponent';
import userEvent from '@testing-library/user-event';

// Mock de fetch global
global.fetch = jest.fn();

// Mock de authApi
jest.mock('@/lib/api/auth', () => ({
  authApi: {
    logout: jest.fn().mockResolvedValue({ success: true }),
  },
}));

// Mock de userApi
jest.mock('@/lib/api/user', () => ({
  userApi: {
    getMe: jest.fn(),
    updateUser: jest.fn().mockResolvedValue({ success: true }),
    deleteUser: jest.fn().mockResolvedValue({ success: true }),
  },
}));

// Mock de js-cookie
jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

// Mock de next/navigation
const mockRouter = { push: jest.fn() };
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/profile',
}));

// Mock del hook useGetUser
const mockUseGetUser = jest.fn();
jest.mock('@/hooks/useGetUser', () => ({
  __esModule: true,
  default: () => mockUseGetUser(),
}));

describe('Profile Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock del token en las cookies
    (Cookies.get as jest.Mock).mockReturnValue('fake-token');
    // Mock de la respuesta de getMe
    (userApi.getMe as jest.Mock).mockResolvedValue({
      id: 1,
      user: 'testuser',
      email: 'test@test.com',
      nickname: 'testnick',
    });
    // Mock por defecto de useGetUser
    mockUseGetUser.mockReturnValue({
      user: {
        id: 1,
        user: 'testuser',
        email: 'test@test.com',
        nickname: 'testnick',
      },
      isLoading: false,
      mutate: jest.fn(),
    });
  });

  it('debería renderizar la página de perfil correctamente', async () => {
    render(
      <>
        <AvatarComponent />
        <Profile />
      </>
    );

    // Verificar elementos principales
    await waitFor(() => {
      expect(screen.getByText('Mi perfil')).toBeInTheDocument();
      expect(screen.getByText('Perfil de usuario')).toBeInTheDocument();
      expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
      expect(screen.getByText('Eliminar cuenta')).toBeInTheDocument();
    });
  });

  it('debería redirigir a login si no hay usuario', async () => {
    // Mock de useGetUser para simular que no hay usuario
    mockUseGetUser.mockReturnValue({
      user: null,
      isLoading: false,
      mutate: jest.fn(),
    });

    render(
      <>
        <AvatarComponent />
        <Profile />
      </>
    );

    // Esperar a que el componente se renderice y verificar la redirección
    await waitFor(
      () => {
        expect(mockRouter.push).toHaveBeenCalledWith('/login');
      },
      { timeout: 3000 }
    );
  });

  it('debería redirigir a login cuando se cierra sesión y eliminar cookies', async () => {
    render(
      <>
        <AvatarComponent />
        <Profile />
      </>
    );

    const user = userEvent.setup();
    const logoutButton = screen.getByText('Cerrar sesión');
    await user.click(logoutButton);

    // Verificar que se llama a logout
    expect(authApi.logout).toHaveBeenCalled();

    // Verificar la redirección
    await waitFor(
      () => {
        expect(mockRouter.push).toHaveBeenCalledWith('/login');
      },
      { timeout: 3000 }
    );
  });

  it('debería eliminar la cuenta cuando se hace click en eliminar cuenta', async () => {
    render(
      <>
        <AvatarComponent />
        <Profile />
      </>
    );

    const user = userEvent.setup();
    
    // Abrir el diálogo de eliminar cuenta
    const deleteButton = screen.getByText('Eliminar cuenta');
    await user.click(deleteButton);

    // Esperar a que el diálogo se abra y hacer click en el botón de confirmar
    await waitFor(async () => {
      const confirmButton = screen.getByRole('button', { name: /eliminar cuenta/i });
      await user.click(confirmButton);
    });

    // Verificar que se llamó a deleteUser con el ID correcto
    expect(userApi.deleteUser).toHaveBeenCalledWith(1);
  });

  it('debería actualizar el nickname cuando se hace click en guardar', async () => {
    render(
      <>
        <AvatarComponent />
        <Profile />
      </>
    );

    const user = userEvent.setup();

    // Abrir el modal de editar nickname
    const editButton = screen.getByTestId('edit-nickname-button');
    await user.click(editButton);

    // Esperar a que el modal se abra y escribir el nuevo nickname
    await waitFor(async () => {
      const nicknameInput = screen.getByPlaceholderText('Escribe aquí tu nuevo nickname');
      await user.clear(nicknameInput);
      await user.type(nicknameInput, 'nuevo_nickname');

      // Hacer click en guardar
      const saveButton = screen.getByRole('button', { name: /guardar/i });
      await user.click(saveButton);
    });

    // Verificar que se llamó a updateUser con los datos correctos
    expect(userApi.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        user: 'testuser',
        email: 'test@test.com',
        nickname: 'nuevo_nickname',
      })
    );
  });
});
