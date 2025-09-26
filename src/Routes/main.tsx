import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Home.tsx";
import Login from "./Login.tsx";
import Settings from "./Settings.tsx";
import UserProfile from "./UserProfile.tsx";

const router = createBrowserRouter([
  {path: "/", element: <Login />},
  {path: "/home", element: <Home />},
  {path: "/settings", element: <Settings/>},
  {path: "/user-profile", element: <UserProfile/>}
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)




