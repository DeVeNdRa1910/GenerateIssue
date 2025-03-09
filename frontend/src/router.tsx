import { createBrowserRouter } from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from "./pages/Signup";
import CreateAdmin from "./pages/CreatAdmin";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/createAdmin',
        element: <CreateAdmin />
    },
    {
        path: '/profile',
        element: <Profile />
    }
])


export default router;