import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/api";
import useAuth from "../../hooks/useAuth";

const LOGOUT_URL = "/auth/logout";

const Home = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({
      username: "",
      accessToken: "",
      roles: [""],
    });

    try {
      const response = await axios.post(
        LOGOUT_URL,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/staff">Go to the Employee page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
