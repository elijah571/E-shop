import "./index.css";
import App from "./App.jsx";
import Login from "./Pages/Users/Login.jsx";
import Private from "./Components/Private.jsx";
import Signup from "./Pages/Users/Signup.jsx";
import store from "./Redux/store.js";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="" element={<Private />} >
            
          </Route>
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
