import "react-toastify/dist/ReactToastify.css";
import Layout from "./Pages/Layout/Layout";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Layout/>
      <main className="py-3">
        <Outlet/>
      </main>
    </div>
  )
}

export default App
