import { render, screen } from "@testing-library/react";
import CartCard from "./CartCard";
import userEvent from "@testing-library/user-event";

// Primero definimos el mock
jest.mock("@/store/useCartStore", () => ({
  useCartStore: () => mockUseCartStore,
}));

// Luego definimos las constantes
const mockProduct = {
  id: 1,
  name: "Producto 1",
  title: "Producto 1",
  price: 100,
  quantity: 1,
  image: "https://via.placeholder.com/150",
};

const mockRemoveItem = jest.fn();
const mockUpdateItemQuantity = jest.fn();

// Mock de las funciones de useCartStore
const mockUseCartStore = {
  removeItem: mockRemoveItem,
  updateItemQuantity: mockUpdateItemQuantity,
};

describe("CartCard", () => {
  // Resetear los mocks antes de cada test
  beforeEach(() => {
    mockRemoveItem.mockClear();
    mockUpdateItemQuantity.mockClear();
  });

  it("should render the cart card", () => {
    render(<CartCard product={mockProduct} />);

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("×")).toBeInTheDocument();
  });

  it("should remove the product when the remove button is clicked", async () => {
    render(<CartCard product={mockProduct} />);
    const removeButton = screen.getByText("×");

    const user = userEvent.setup();
    await user.click(removeButton);
    expect(mockRemoveItem).toHaveBeenCalledWith(mockProduct.id);
  });

  it("should update the quantity when the quantity buttons are clicked", async () => {
    render(<CartCard product={mockProduct} />);

    const user = userEvent.setup();
    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");

    await user.click(incrementButton);
    // Verificamos que la función updateItemQuantity fue llamada con el producto id y la cantidad 2
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith(mockProduct.id, 2);

    mockUpdateItemQuantity.mockClear();

    await user.click(decrementButton);
    // Verificamos que la función updateItemQuantity fue llamada con el producto id y la cantidad 0
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith(mockProduct.id, 0);
  });
});
