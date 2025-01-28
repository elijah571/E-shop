import AdminMenu from "../Admin/AdminMenu";
import FavoritesCount from "../Products/FavoritesCount";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to handle the hamburger menu

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="w-full p-4 bg-[#000] text-white flex items-center justify-between fixed top-0 left-0 right-100 z-[999]"
      id="navigation-container"
    >
      {/* Hamburger Icon for small screens */}
      <button
        onClick={toggleMenu}
        className="block lg:hidden p-2 rounded-md focus:outline-none"
      >
        <BiMenu size={26} />
      </button>

      {/* Links Container */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col lg:flex-row items-center gap-14 lg:gap-14 absolute top-12  lg:static bg-black lg:bg-transparent transition-all duration-300 ease-in-out transform lg:flex`}
      >
        <Link to="/" className="flex items-center py-3 px-4">
          <AiOutlineHome className="mr-2" size={26} />
          <span className="hidden lg:block">HOME</span>
        </Link>

        <Link to="/shop" className="flex items-center py-3 px-4">
          <AiOutlineShopping className="mr-2" size={26} />
          <span className="hidden lg:block">SHOP</span>
        </Link>

        <Link to="/cart" className="flex items-center py-3 px-4 relative">
          <AiOutlineShoppingCart className="mr-2" size={26} />
          <span className="hidden lg:block">Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 right-10 px-1 py-0 text-xs text-white bg-pink-500 rounded-full">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>

        <Link to="/favorite" className="flex items-center py-3 px-4 relative">
          <FaHeart className="mr-2" size={20} />
          <span className="hidden lg:block">Favorites</span>
          <FavoritesCount />
        </Link>
      </div>

      {/* User Dropdown */}
      <div className="relative z-[10000]">
        <button onClick={toggleDropdown} className="flex items-center text-white">
          {userInfo && <span>{userInfo.username}</span>}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <div className="absolute right-0 mt-2 flex bg-white text-gray-600 z-[1000]">
            {/* Admin Menu and Dropdown Options */}
            <div className="flex flex-col gap-2 mr-4">
              
            </div>

            <ul className="flex flex-col">
              {userInfo.isAdmin && (
                <> <AdminMenu />
                  <li>
                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-100">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">
                      Users
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {!userInfo && (
          <ul className="flex flex-row items-center gap-4">
            <li>
              <Link to="/login" className="flex items-center">
                <AiOutlineLogin className="mr-2" size={26} />
                <span>LOGIN</span>
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center">
                <AiOutlineUserAdd size={26} />
                <span>REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
