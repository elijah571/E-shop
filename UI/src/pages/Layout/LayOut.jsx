import { useState } from "react";
import { FaChevronDown, FaHeart, FaHome, FaShopify, FaShoppingCart, FaSignInAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../Redux/api/userSlice";
import { logOut } from "../../Redux/features/auth/authSlice";

 import "./Layout.css";
const Layout = () => {
    const { userInfo } = useSelector(state => state.auth);
    const [sidebar, setSidebar] = useState(false);
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const logoutHandler = async () => {
        await logoutApiCall().unwrap();
        dispatch(logOut());
        localStorage.clear();
        navigate('/login');
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Log userInfo to confirm its structure
    console.log('userInfo:', userInfo);

    return (
        <div
            className={`${sidebar ? 'hidden' : 'flex'} flex-col w-[15%] h-[100vh] bg-black text-white nav-container gap-14 items-center fixed`}
            onMouseLeave={closeDropdown}
        >
            <div className="flex flex-col justify-center gap-5 mt-10">
                <Link to="/" className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-2 rounded transition-transform transform hover:translate-x-2">
                    <FaHome size={20} />
                    <span className="nav-item-name">HOME</span>
                </Link>
            </div>
            <div className="flex flex-col justify-center gap-5">
                <Link to="/shop" className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-2 rounded transition-transform transform hover:translate-x-2">
                    <FaShopify size={20} />
                    <span className="nav-item-name">SHOP</span>
                </Link>
            </div>
            <div className="flex flex-col justify-center gap-5">
                <Link to="/favorite" className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-2 rounded transition-transform transform hover:translate-x-2">
                    <FaHeart size={20} />
                    <span className="nav-item-name">FAVORITE</span>
                </Link>
            </div>
            <div className="flex flex-col justify-center gap-5">
                <Link to="/cart" className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-2 rounded transition-transform transform hover:translate-x-2">
                    <FaShoppingCart size={20} />
                    <span className="nav-item-name">CART</span>
                </Link>
            </div>
            <div className="flex flex-col justify-center gap-5 mt-auto relative">
                {userInfo && userInfo.user ? (
                    <>
                        <div className={`flex items-center ${dropDownOpen ? 'mb-56' : 'mt-2'}`}>
                            <span className="text-white">{userInfo.user.name}</span>
                            <button
                                onClick={() => setDropdownOpen(!dropDownOpen)}
                                className="flex items-center px-1 py-2 mb hover:bg-gray-800 mb rounded transition-transform transform hover:translate-x-2 focus:outline-none"
                            >
                                <FaChevronDown size={15} />
                            </button>
                        </div>

                        {dropDownOpen && (
                            <div
                                className="absolute bottom-2 top-6 mb-4 text-white rounded shadow-lg flex flex-col justify-center items-center gap-2"
                                onMouseLeave={closeDropdown}
                            >
                                {/* <Link to="/profile" className="block w-full text-center px-4 py-2">
                                    Profile
                                </Link> */}
                                {userInfo.user.isAdmin && (
                                    <>
                                        <Link to="/dashboard" className="block w-full text-center px-4 ">
                                            Dashboard
                                        </Link>
                                        <Link to="/category" className="block w-full text-center px-4 ">
                                            Category
                                        </Link>
                                        <Link to="/users" className="block w-full text-center px-4 ">
                                            Users
                                        </Link>
                                        <Link to="/products" className="block w-full text-center px-4 ">
                                            Product
                                        </Link>
                                    </>
                                )}
                                <button onClick={logoutHandler} className="block w-full text-center px-4 pb-10 ">
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/login" className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-2 rounded transition-transform transform hover:translate-x-2">
                            <FaSignInAlt size={20} />
                            <span className="nav-item-name">LOGIN</span>
                        </Link>
                        <Link to="/register" className="flex items-center space-x-4 hover:bg-gray-800 px-4 py-2 rounded transition-transform transform hover:translate-x-2">
                            <FaUser size={20} />
                            <span className="nav-item-name">REGISTER</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Layout;
