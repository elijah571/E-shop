import "./LayOut.css";
import { AiOutlineHome, AiOutlineLogin, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const LayOut = () => {
  return (
    <nav className="nav-container">
      <div className="flex items-center justify-between nav-content">
        <Link to='/' className="nav-link">
          <AiOutlineHome className="nav-icon" strokeWidth={2}/>
          <span>Home</span>
        </Link>
       
        <Link to='/shop' className="nav-link">
          <AiOutlineShopping className="nav-icon" />
          <span>Shop</span>
        </Link> 
        <Link to='/favorite' className="nav-link">
          <FaHeart className="nav-icon" />
          <span></span>
        </Link>
        <Link to='/cart' className="nav-link">
          <AiOutlineShoppingCart className="nav-icon" />
          <span></span>
        </Link>
        <Link to='/login' className="nav-link">
          <AiOutlineLogin className="nav-icon" />
          <span></span>
        </Link>
        <Link to='/register' className="nav-link">
          <AiOutlineUserAdd className="nav-icon" />
          <span></span>
        </Link>
      </div>
    </nav>
  );
};

export default LayOut;
