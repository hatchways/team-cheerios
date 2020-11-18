import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default [
  { path: "/", component: Login },
  { path: "/signup", component: Signup },
  { path: "/dashboard", component: Dashboard, auth: true, exact: false },
];
