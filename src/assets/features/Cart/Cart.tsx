import React, { useEffect, useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import './cart.css';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const cart = userData.cart || [];
    setCartItems(cart);

    const total = cart.reduce((sum: number, item: any) => sum + (item.price || 0), 0);
    setTotalPrice(total);

    setUserBalance(userData.balance || 0); // İstifadəçinin balansını gətir
  }, []);

  const handleRemoveFromCart = (item: any) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedCart = userData.cart.filter((cartItem: any) => cartItem.id !== item.id);

    const updatedUserData = { ...userData, cart: updatedCart };
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    setCartItems(updatedCart);

    const total = updatedCart.reduce((sum: number, cartItem: any) => sum + (cartItem.price || 0), 0);
    setTotalPrice(total);
  };

  const handleCheckout = () => {
    if (userBalance < totalPrice) {
      alert("Insufficient balance!");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const purchasedGames = [...(userData.purchasedGames || []), ...cartItems];
    const updatedBalance = userBalance - totalPrice;

    const updatedUserData = {
      ...userData,
      purchasedGames,
      cart: [],
      balance: updatedBalance,
    };

    localStorage.setItem("user", JSON.stringify(updatedUserData));

    setCartItems([]); // Səbəti boşaldırıq
    setUserBalance(updatedBalance); // Yeni balansı yeniləyirik
    setTotalPrice(0); // Toplam qiyməti sıfırlayırıq

    alert("Checkout successful! Purchased games added to your account.");
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <h2>Balance: ${userBalance.toFixed(2)}</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item: any) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <span>{item.category}</span>
                  <p>{isNaN(item.price) ? "Free" : `$${item.price.toFixed(2)}`}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleRemoveFromCart(item)}>
                      <MdOutlineRemoveShoppingCart /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
