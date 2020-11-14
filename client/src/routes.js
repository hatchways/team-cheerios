import Dashboard from "./pages/Dashboard";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default [
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/", component: Dashboard, auth: true },
  { path: "/friends", component: Friends, auth: true },
];
