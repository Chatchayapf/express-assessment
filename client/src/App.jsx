import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Owner from "./pages/Owner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "owner", element: <Owner /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
