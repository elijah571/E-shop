import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../redux/Users/signupSlice";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userSignup } = useSelector((state) => state.signup);

  useEffect(() => {
    if (userSignup) {
      // Store user data to localStorage after successful signup
      localStorage.setItem("userLogin", JSON.stringify(userSignup));

      // Redirect to the homepage after signup
      navigate("/");  // Or navigate("/home") based on your route
    }
  }, [userSignup, navigate]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      return alert('All fields are required!');
    }

    dispatch(signupUser(userData));
  };

  const renderError = () => {
    if (error) {
      return (
        <p className="text-red-500">
          {error.message || "An error occurred. Please try again."}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {renderError()}
        {userSignup && <p className="text-green-500 mt-4">Signup successful! Welcome, {userSignup.name}</p>}
        
        {/* Add link to login */}
        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-600"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
