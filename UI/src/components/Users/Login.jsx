import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserLogin } from "../../redux/Users/loginSlice";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const { loading, userLogin, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin) {
      navigate("/"); // Redirect to home page after successful login
    }
  }, [userLogin, navigate]);

  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin(userData)); // Dispatch login action
  };

  const renderError = () => {
    if (error) {
      return (
        <p className="text-red-500">
          {typeof error === 'string' ? error : error.message || "An error occurred. Please try again."}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInput}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInput}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {renderError()}
        {userLogin && (
          <div className="mt-4">
            <p className="text-green-500">Login successful! Welcome back, {userLogin.name}</p>
          </div>
        )}
        <div className="mt-4 flex justify-between text-sm">
          <Link to={'/reset'} className="text-blue-500 hover:text-blue-600">
            Forgotten Password?
          </Link>
          <Link to={'/register'} className="text-blue-500 hover:text-blue-600">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
