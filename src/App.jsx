import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./container/Layout";
import { lazy } from "react";

import Paths from "./routes/Paths";
import "./index.css"
import { useSelector } from "react-redux";

const Home = lazy(() => import("./pages/Home"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
  // {
  // 	path: "/login",
  // 	element: add login page
  // },
]);

function App() {
const {mode} = useSelector(state=>state.darkMode);

  return (
    <div className="">
      <div className={`w-full h-screen flex flex-col ${mode ? "bg-white" : "bg-[#040404]"}`}>
     
     <Paths />
   </div>
    </div>
    
  );
}

export default App;
