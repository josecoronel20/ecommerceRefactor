import { render, screen } from "@testing-library/react";
import Cart from "./Cart";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock de next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

const mockItems = [
  {
    id: 1,
    name: "Producto 1",
    title: "Producto 1",
    price: 100,
    quantity: 1,
  },
  {
    id: 2,
    name: "Producto 2",
    title: "Producto 2",
    price: 200,
    quantity: 2,
  },
];

const mockClearCart = jest.fn();

// Mock de useCartStore
jest.mock("@/store/useCartStore", () => ({
  useCartStore: () => ({
    items: mockItems,
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateItemQuantity: jest.fn(),
    clearCart: mockClearCart,
  }),
}));

// Mock de useUserInfo
jest.mock("@/hooks/useUserInfo", () => ({
  __esModule: true,
  default: () => ({
    userInfo: {
      id: 1,
      purchases: [],
    },
    mutate: jest.fn(),
  }),
}));

// Mock de updateUser
jest.mock("@/lib/apiUser", () => ({
  updateUser: jest.fn().mockResolvedValue({}),
}));

// Mock de fetch global
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({}),
});

describe("Cart", () => {
  beforeEach(() => {
    mockClearCart.mockClear();
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Cart />);
    expect(screen.getByTestId("cart-button")).toBeInTheDocument();
  });

  it("shows the cart when the button is clicked", async () => {
    render(<Cart />);
    const cartButton = screen.getByTestId("cart-button");
    const user = userEvent.setup();
    await user.click(cartButton);

    expect(screen.getByText("Carrito de compras")).toBeInTheDocument();
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Finalizar compra" })
    ).toBeInTheDocument();
  });

  it("clears the cart when the finish purchase button is clicked", async () => {
    render(<Cart />);
    const cartButton = screen.getByTestId("cart-button");
    const user = userEvent.setup();
    await user.click(cartButton);

    const finishPurchaseButton = screen.getByText("Finalizar compra");
    await user.click(finishPurchaseButton);

    expect(mockClearCart).toHaveBeenCalled();
    expect(
      screen.getByText("¡Compra realizada con éxito!")
    ).toBeInTheDocument();
  });
});
