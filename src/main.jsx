import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./Components/Authform";
import Posts from "./Components/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthForm />,
  },
  {
    path: "/users",
    element: <Posts />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
