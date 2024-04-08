import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../../api/api";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

interface IUser {
  _id: string;
  username: string;
  roles: string[];
  active: boolean;
}

function Users() {
  const [users, setUsers] = useState<IUser[]>();

  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal,
        });
        isMounted && setUsers(response.data.users);
      } catch (err: any) {
        console.error(err?.message);
        navigate("/signin", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
