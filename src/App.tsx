import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.tsx";
import Login from "./Page/Login/Login.tsx";
import Register from "./Page/Register/register.tsx";
import Layout from "./Page/Layout/layout.tsx";
import Unauthorized from "./Page/Unauthorized/unauthorized.tsx";
import Home from "./Page/Home/home.tsx";
import Admin from "./Page/Admin/admin.tsx";
import Lounge from "./Page/Lounge/lounge.tsx";
import Missing from "./Page/Missing/missing.tsx";
import RequireAuth from "./Page/RequireAuth/requireAuth.tsx";
import Staff from "./Page/Staff/staff.tsx";
import PersistLogin from "./Page/PersistLogin/PersistLogin.tsx";
import Home_2 from "./Page/Home_2/Home_2.tsx";

const ROLES = {
  admin: "Admin",
  employee: "Employee",
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="signin" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* <Route path="/" element={<Home_2 />} /> */}

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.admin, ROLES.employee]} />
              }
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.employee]} />}>
              <Route path="staff" element={<Staff />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.admin, ROLES.employee]} />
              }
            >
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
