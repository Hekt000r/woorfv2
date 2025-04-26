import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./Components/Navbar.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProgramPage from "./Components/ProgramPage.tsx";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/program/:name", Component: ProgramPage },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <title>woorf - A fast, no ads software hub.</title>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>
);
