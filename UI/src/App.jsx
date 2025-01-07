import Cart from "./pages/cart/Cart";
import Favorite from "./pages/favorites/Favorite";
import Home from "./pages/home/Home";
import LayOut from "./pages/Layout/LayOut";
import Login from "./pages/users/Login";
import Profile from "./pages/users/Profile";
import Shop from "./pages/shop/Shop";
import Signup from "./pages/users/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// App.jsx

const App = () => {
  return (
    <Router>
      <LayOut>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </LayOut>
    </Router>
  );
};

export default App;
