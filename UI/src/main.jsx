import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import { Provider } from "react-redux";

// import { store } from "./redux/store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
    {/* <Provider>
    
    </Provider> */}
    
  </StrictMode>,
)
