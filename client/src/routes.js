import Dashboard from "./pages/Dashboard";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

export default [
  { path: "/", component: Login },
  { path: "/signup", component: Signup },
  { path: "/dashboard", component: Dashboard, auth: true, exact: false },
  { path: "/friends", component: Friends, auth: true, exact: true },
  { path: "/:userId/profile", component: Profile, auth: true, exact: true },
];
