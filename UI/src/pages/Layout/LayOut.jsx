import "./Layout.css";
import { useState } from "react";
import { FaHeart, FaHome, FaShopify, FaShoppingCart, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropDownOpen);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggleCloseSidebar = () => {
    setCloseSidebar(!closeSidebar);
  }

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${sidebar ? 'hidden' : 'flex'} flex-col w-[15%] h-[100vh] hover:w-[15%] fixed bg-black text-white nav-container gap-14 items-center`}
    >
      <div className="flex flex-col justify-center gap-5">
        <Link to={'/'}
          className="flex items-center space-x-4 transition-transform transform hover:translate-x-2"
        >
          <FaHome size={20} />
          <span className="nav-item-name">HOME</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <Link to={'/shop'}
          className="flex items-center space-x-4 transition-transform transform hover:translate-x-2"
        >
          <FaShopify size={20} />
          <span className="nav-item-name">SHOP</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <Link to={'/favorite'}
          className="flex items-center space-x-4 transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={20} />
          <span className="nav-item-name">FAVORITE</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <Link to={'/cart'}
          className="flex items-center space-x-4 transition-transform transform hover:translate-x-2"
        >
          <FaShoppingCart size={20} />
          <span className="nav-item-name">CART</span>
        </Link>
      </div>

      {/* Push Login and Register links to the bottom */}
      <div className="flex flex-col justify-center gap-5 mt-auto">
        <Link to={'/login'}
          className="flex items-center space-x-4 transition-transform transform hover:translate-x-2"
        >
          <FaSignInAlt size={20} />
          <span className="nav-item-name">LOGIN</span>
        </Link>
        <Link to={'/register'}
          className="flex items-center space-x-4 transition-transform transform hover:translate-x-2"
        >
          <FaUser size={20} />
          <span className="nav-item-name">REGISTER</span>
        </Link>
      </div>
    </div>
  );
}

export default Layout;
