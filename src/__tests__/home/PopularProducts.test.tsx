import { render, screen, act } from '@testing-library/react';
import PopularProducts from '../../app/components/PopularProducts';
import useSWR from 'swr';

const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
  },
];

// Mock de useSWR
jest.mock('swr');
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

describe('PopularProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render skeleton when loading', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    render(<PopularProducts />);
    expect(screen.getByTestId('skeleton-popular-products')).toBeInTheDocument();
  });

  it('should show error state', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Error fetching data'),
    });
    render(<PopularProducts />);
    expect(screen.getByText('Error al cargar los productos destacados')).toBeInTheDocument();
  });

  it('should show products when loaded', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: {
        products: [
          {
            id: 1,
            title: 'Product 1',
            price: 100,
            description: 'Descripción 1',
            category: 'Electrónicos',
            image: 'https://via.placeholder.com/150',
            popular: true,
          },
          {
            id: 2,
            title: 'Product 2',
            price: 200,
            description: 'Descripción 2',
            category: 'Ropa',
            image: 'https://via.placeholder.com/150',
            popular: true,
          },
        ],
      },
      isLoading: false,
      error: undefined,
    });
    render(<PopularProducts />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
