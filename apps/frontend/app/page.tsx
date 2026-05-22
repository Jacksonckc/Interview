"use client";

import { FormEvent, useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  flavor: "classic" | "chocolate" | "fruit" | "seasonal";
  stock: number;
  isFeatured: boolean;
};

type CartItem = Product & {
  quantity: number;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4001";

const fetchProducts = async () => {
  const response = await fetch(`${apiBaseUrl}/api/products`);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return (await response.json()) as Product[];
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch(() => setStatusMessage("We could not load today's cookies."));
  }, []);

  const cartSubtotal = cartItems.reduce((total, item) => total + item.price, 0);

  const addToCart = (product: Product) => {
    setStatusMessage("");
    setCartItems((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...currentCart, { ...product, quantity: 1 }];
      }

      return currentCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((currentCart) =>
      currentCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const submitCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("Placing your order...");

    const response = await fetch(`${apiBaseUrl}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerName,
        email,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: 1
        }))
      })
    });

    if (!response.ok) {
      const body = (await response.json()) as { message?: string };
      setStatusMessage(body.message ?? "Checkout failed.");
      return;
    }

    const order = (await response.json()) as { id: string; total: number };
    const updatedProducts = await fetchProducts();

    setProducts(updatedProducts);
    setCartItems([]);
    setCustomerName("");
    setEmail("");
    setStatusMessage(`Order ${order.id.slice(0, 8)} placed for $${order.total.toFixed(2)}.`);
  };

  return (
    <main className="page">
      <section className="hero">
        <p>Small-batch online bakery</p>
        <h1>Crumb & Co.</h1>
        <p>Browse cookies, add treats to the cart, and place a mock checkout order.</p>
      </section>

      <section className="shop-grid" aria-label="Cookie shop">
        <div>
          <h2>Shop cookies</h2>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image" aria-hidden="true">
                  {product.image}
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <span>{product.stock} left</span>
                </div>
                <button className="primary-button" onClick={() => addToCart(product)} type="button">
                  Add to cart
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="cart" aria-label="Shopping cart">
          <h2>Your box</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cookie box is empty.</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <div>${item.price.toFixed(2)} each</div>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(item.id)} type="button" aria-label={`Remove ${item.name}`}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)} type="button" aria-label={`Add ${item.name}`}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cart-total">
            <strong>Subtotal</strong>
            <strong>${cartSubtotal.toFixed(2)}</strong>
          </div>

          <form className="checkout-form" onSubmit={submitCheckout}>
            <h3>Checkout</h3>
            <label>
              Name
              <input
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Ada Lovelace"
                required
                value={customerName}
              />
            </label>
            <label>
              Email
              <input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ada@example.com"
                required
                type="email"
                value={email}
              />
            </label>
            <button className="primary-button" disabled={cartItems.length === 0} type="submit">
              Place order
            </button>
          </form>

          {statusMessage ? <p className="status-message">{statusMessage}</p> : null}
        </aside>
      </section>
    </main>
  );
}
