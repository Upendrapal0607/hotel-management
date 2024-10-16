import PageNotFound from "../../Element/NotFound";
import AdminLogin from "../Authentication/AdminLogin";
import Login from "../Authentication/login";
import Register from "../Authentication/Register";
import { About } from "../Components/About";
import { Contact } from "../Components/Contact";
import { Services } from "../Components/Services";
import Home from "../Home";
import { SingleHotel } from "../Hotel/SingleHotel";
export const PublicRoute = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/hotel/:id",
    element: SingleHotel,
  },
  {
    path: "/admin/login",
    element: AdminLogin,
  },
  {
    path: "/signup",
    element: Register,
  },
  {
    path: "/about",
    element: About,
  },
  {
    path: "/contact",
    element: Contact,
  },
  {
    path: "/services",
    element: Services,
  },
  {
    path: "*",
    element: PageNotFound,
  },
];
