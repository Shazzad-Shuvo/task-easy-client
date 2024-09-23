import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Routes
import router from "./Routes/Routes";
// react-router
import { RouterProvider } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
