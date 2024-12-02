import React, { useEffect, useState, useCallback } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import './wishlist.css'

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setWishlistItems(userData.wishlist || []);
  }, []);

  const handleAddToCart = (item: any) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedCart = [...(userData.cart || []), item];

    const updatedUserData = { ...userData, cart: updatedCart };
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    handleRemoveFromWishlist(item);
  };

  const handleRemoveFromWishlist = (item: any) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedWishlist = userData.wishlist.filter((wishlistItem: any) => wishlistItem.id !== item.id);

    const updatedUserData = { ...userData, wishlist: updatedWishlist };
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    setWishlistItems(updatedWishlist);
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMoreItems) return;

    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom) {
      setLoading(true);
      setTimeout(() => {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const allItems = userData.wishlist || [];

        const newItems = allItems.slice(wishlistItems.length, wishlistItems.length + 10);
        setWishlistItems((prevItems) => [...prevItems, ...newItems]);

        if (wishlistItems.length + newItems.length >= allItems.length) {
          setHasMoreItems(false);
        }
        setLoading(false);
      }, 1000);
    }
  }, [loading, wishlistItems, hasMoreItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  

  return (
    <div className="wishlist">
      <h1>Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item: any) => (
            <div
              className="wishlist-item"
              key={item.id}
            >
              <div className="wishlist-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="wishlist-item-info">
                <h3>{item.name}</h3>
                <span>{item.category}</span>
                <p>{isNaN(item.price) ? "Free" : `$${item.price.toFixed(2)}`}</p>
                <div className="wishlist-item-actions">
                  <button onClick={() => handleAddToCart(item)}>
                    <IoCartOutline /> Add to Cart
                  </button>
                  <button onClick={() => handleRemoveFromWishlist(item)}>
                    <MdOutlineRemoveShoppingCart /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {loading && <div className="loading">Loading more items...</div>}
    </div>
  );
};

export default Wishlist;
