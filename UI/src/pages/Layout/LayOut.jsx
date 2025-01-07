import "./LayOut.css";
import { useEffect, useState } from "react";
import { FaChevronDown, FaHeart, FaHome, FaShoppingBag, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserLogout } from "../../redux/Users/logOut";
import { clearUser } from "../../redux/Users/loginSlice";

const LayOut = ({ children }) => {
  const { userLogin } = useSelector((state) => state.login); // Use the correct slice of state for user data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = userLogin?.user; // Getting user from Redux state

  const handleLogout = async () => {
    try {
      await dispatch(fetchUserLogout()); // Make sure this dispatch action logs the user out from the backend
      dispatch(clearUser()); // Clear user data in Redux store
      localStorage.removeItem("userLogin"); // Optionally clear from localStorage too
      navigate('/login'); // Navigate to login page after logout
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const renderUserGreeting = () => {
    if (user && user.name) {
      return (
        <div
          className="user-greeting"
          style={{ marginBottom: dropdownOpen ? "100px" : "0" }}  // Dynamically add margin
        >
          <span className="nav-user-greeting" onClick={toggleDropdown}>
            {user.name}
            <FaChevronDown className="dropdown-icon" />
          </span>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              {user.isAdmin && <Link to="/dashboard" className="dropdown-item">Dashboard</Link>}
              <button onClick={handleLogout} className="dropdown-item logout-button">
                <FaSignOutAlt className="nav-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="layout-container">
      <nav className="nav-container">
        <div className="nav-content">
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>

          <Link to="/favorite" className="nav-link">
            <FaHeart className="nav-icon" />
            <span>Favorites</span>
          </Link>

          <Link to="/shopping" className="nav-link">
            <FaShoppingBag className="nav-icon" />
            <span>Shopping</span>
          </Link>

          <Link to="/cart" className="nav-link">
            <FaShoppingCart className="nav-icon" />
            <span>Cart</span>
          </Link>

          <div className="spacer"></div>

          {user ? (
            <div className="user-controls">
              {renderUserGreeting()}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                <FaSignInAlt className="nav-icon" />
                <span>Login</span>
              </Link>

              <Link to="/register" className="nav-link">
                <FaUserPlus className="nav-icon" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default LayOut;
