import React, { useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type User = {
  id: string;
  gameName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  balance: number;
  wishlist: WishlistItem[];
  cart: CartItem[];
  purchasedGames: string[];
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };
  
  const handleRemoveFromWishlist = (id: string) => {
    if (user) {
      const updatedWishlist = user.wishlist.filter((item) => item.id !== id);
      setUser({ ...user, wishlist: updatedWishlist });
      localStorage.setItem("user", JSON.stringify({ ...user, wishlist: updatedWishlist }));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    if (user) {
      const updatedCart = user.cart.filter((item) => item.id !== id);
      setUser({ ...user, cart: updatedCart });
      localStorage.setItem("user", JSON.stringify({ ...user, cart: updatedCart }));
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "editProfile":
        return (
          <div className="profile-edit-section">
            <h2 className="profile-section-title">Edit Profile</h2>
            <form
              className="profile-edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (user) {
                  localStorage.setItem("user", JSON.stringify(user));
                  alert("Profile updated successfully!");
                }
              }}
            >
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={user?.firstName || ""}
                  onChange={(e) =>
                    setUser({ ...user!, firstName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={user?.lastName || ""}
                  onChange={(e) =>
                    setUser({ ...user!, lastName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  onChange={(e) =>
                    setUser({ ...user!, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Avatar URL:</label>
                <input
                  type="text"
                  value={user?.avatar || ""}
                  onChange={(e) =>
                    setUser({ ...user!, avatar: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="profile-save-button">Save</button>
            </form>
          </div>
        );

      case "overview":
        return (
          <div>
            <div className="profile-header">
              <img className="profile-image" src={user?.avatar} alt="Profile" />
              <div>
                <h1 className="profile-username">{user?.gameName}</h1>
                <p className="profile-balance">Balance: ${user?.balance}</p>
              </div>
            </div>
            <div className="profile-details">
              <h2 className="profile-section-title">Profile Information</h2>
              <p><strong>First Name:</strong> {user?.firstName}</p>
              <p><strong>Last Name:</strong> {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>

          </div>
        );
      case "purschasedgames":
        return (
          <div className="profile-wishlist-section">
            <h2 className="profile-section-title">Purschased Games</h2>
            <div className="profile-wishlist-list">
              {user?.purchasedGames?.length ? (
                user.purchasedGames.map((item) => (
                  <div
                    className="profile-item-card"
                    key={item.id}
                    onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
                    onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
                  >
                    <img className="wishlist-item-image" src={item.image} alt={item.name} />
                    <h3 className="wishlist-item-name">{item.name}</h3>
                    <p className="wishlist-item-price">${item.price}</p>
                    <span
                      className="remove-icon"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >

                    </span>
                  </div>
                ))
              ) : (
                <p>Your purschased games is empty.</p>
              )}
            </div>
          </div>
        );
      case "wishlist":
        return (
          <div className="profile-wishlist-section">
            <h2 className="profile-section-title">Wishlist</h2>
            <div className="profile-wishlist-list">
              {user?.wishlist?.length ? (
                user.wishlist.map((item) => (
                  <div
                    className="profile-item-card"
                    key={item.id}
                    onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
                    onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
                  >
                    <span
                      className="remove-icon"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      x
                    </span>

                    <img className="wishlist-item-image" src={item.image} alt={item.name} />
                    <h3 className="wishlist-item-name">{item.name}</h3>
                    <p className="wishlist-item-price">${item.price}</p>
                    <span
                      className="remove-icon"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >

                    </span>
                  </div>
                ))
              ) : (
                <p>Your wishlist is empty.</p>
              )}
            </div>
          </div>
        );
      case "cart":
        return (
          <div className="profile-cart-section">
            <h2 className="profile-section-title">Cart</h2>
            <div className="profile-cart-list">
              {user?.cart?.length ? (
                user.cart.map((item) => (
                  <div
                    className="profile-item-card"
                    key={item.id}
                    onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
                    onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
                  >
                    <span
                      className="remove-icon"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      ×
                    </span>

                    <img className="wishlist-item-image" src={item.image} alt={item.name} />
                    <h3 className="wishlist-item-name">{item.name}</h3>
                    <p className="wishlist-item-price">${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <span
                      className="remove-icon"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      ×
                    </span>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <ul className="profile-nav-list">
          <li className="profile-nav-item" onClick={() => setActiveSection("overview")}>
            Overview
          </li>
          <li className="profile-nav-item" onClick={() => setActiveSection("editProfile")}>
            Edit Profile
          </li>

          <li className="profile-nav-item" onClick={() => setActiveSection("purschasedgames")}>
            Purschased Games
          </li>
          <li className="profile-nav-item" onClick={() => setActiveSection("wishlist")}>
            Wishlist
          </li>
          <li className="profile-nav-item" onClick={() => setActiveSection("cart")}>
            Cart
          </li>
          <li className="profile-nav-item" onClick={handleLogout}>
            Log Out
          </li>
        </ul>
      </aside>
      <main className="profile-main">{renderSection()}</main>
    </div>
  );
};

export default ProfilePage;
