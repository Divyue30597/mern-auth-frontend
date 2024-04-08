import { Link } from "react-router-dom";

import styles from "./navbar.module.scss";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <nav>
      <ul className={styles.navbar}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!auth.accessToken && (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
