import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import epicLogo from "../../img/logo/epic.png";
import "./head.css";
import { fetchMenuData } from "../../features/actions/menuAction";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const menuData = useSelector((state: RootState) => state.menu.menuData);

  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDistributeDropdownVisible, setIsDistributeDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const distributeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchMenuData());
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("scrol");
      if (header) header.classList.toggle("headerAnime", window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
      if (
        distributeDropdownRef.current &&
        !distributeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDistributeDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const toggleDistributeDropdown = () =>
    setIsDistributeDropdownVisible(!isDistributeDropdownVisible);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header>
      <div className="top">
        <div className="logo" onClick={toggleDropdown} ref={dropdownRef}>
          <img src={epicLogo} alt="epic-games-logo" />
          <MdKeyboardArrowLeft
            className={`arrow ${isDropdownVisible ? "arrow-open" : "arrow-close"}`}
          />
          {menuData && (
            <div
              className={`dropdown-menu ${
                isDropdownVisible ? "dropdown-open" : "dropdown-close"
              }`}
            >
              {["play", "discover", "create"].map((section) => (
                <div className="dropdown-section" key={section}>
                  <h4>{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
                  <ul>
                    {menuData[section as keyof typeof menuData]?.map((item, index) => (
                      <li key={index}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="menu-item-image"
                          />
                        )}
                        <span>
                          <a href="#">{item.name}</a>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="menu">
          <a href="#" className="menu-item">
            <img
              src="https://cms-assets.unrealengine.com/qAiDvosPSFGqJxTVuY7h"
              alt="Support"
            />
          </a>
          <a href="#" className="menu-item">
            Support
          </a>
          <div
            className="menu-item distribute"
            onClick={toggleDistributeDropdown}
            ref={distributeDropdownRef}
          >
            Distribute
            <MdKeyboardArrowLeft
              className={`arrow ${
                isDistributeDropdownVisible ? "arrow-open" : "arrow-close"
              }`}
            />
            {menuData?.distribute && (
              <div
                className={`dropdown-menu-distribute ${
                  isDistributeDropdownVisible ? "dropdown-open" : "dropdown-close"
                }`}
              >
                {menuData.distribute.map((item, index) => (
                  <div className="dropdown-item" key={index}>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="buttons">
          {user ? (
            <div className="user-info">
              <img src={user.avatar} alt="Profile" className="profile-avatar" />
              <span className="user-name">{user.gameName}</span>
              <span className="user-balance">{user.balance}$</span>
              {/* <button className="logout" onClick={handleLogout}>
                Logout
              </button> */}
            </div>
          ) : (
            <button className="sign-in" onClick={handleLogin}>
              <span>Sign in</span>
            </button>
          )}
          <button className="download">
            <a href="https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi?trackingId=47ee9210e8e543338065b1c156099a16">
              Download
            </a>
          </button>
        </div>
      </div>

      <div className="bottom" id="scrol">
        <div className="bar">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search store" />
          </div>
          <div className="menu-item">
            <a
              href="discover"
              className={`menu-item ${location.pathname === "/discover" ? "active" : ""}`}
            >
              Discover
            </a>
          </div>
          <div className="menu-item">
            <a href="/browse">Browse</a>
          </div>
          <div className="menu-item">
            <a href="#">News</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
