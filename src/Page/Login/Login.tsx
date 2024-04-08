import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import axios from "../../api/api";
import { Box } from "../../components/Box/box";
import TextInput from "../../components/Input/input";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

interface ISetValue {
  username: string;
  password: string;
}

const LOGIN_URL = "/auth";

const sampleInput = [
  {
    uniqueId: 1,
    labelId: "username",
    inputName: "Username",
    placeholder: "john.doe",
    // pattern: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`,
    type: "text",
    required: true,
    errorMessage: "Please enter a valid username address.",
    icon: <i className="bi bi-envelope"></i>,
  },
  {
    uniqueId: 2,
    labelId: "password",
    inputName: "Password",
    placeholder: "●●●●●●●●",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    type: "password",
    required: true,
    errorMessage:
      "Password should be atleast of length 8 characters and include at least 1 letter, 1 number and 1 special character.",
    icon: <i className="bi bi-key"></i>,
  },
];

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setErrMsg("");
  }, [value]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(value), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username: value.username, accessToken, roles });
      // navigate("/", { replace: true });
      navigate(from, { replace: true });
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue({ ...value, [e?.target?.name]: e?.target?.value });
  }

  return (
    <Box>
      <h1>Sign In</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {sampleInput.map((input) => {
          return (
            <TextInput
              key={input.uniqueId}
              labelId={input.labelId}
              label={input.inputName}
              pattern={input?.pattern}
              type={input.type}
              placeholder={input.placeholder}
              required={input.required}
              icon={input.icon}
              errorMessage={input.errorMessage}
              value={value[input.labelId as keyof ISetValue]}
              onChange={handleChange}
              autoComplete="off"
            />
          );
        })}

        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <button type="submit">Sign In</button>
      </form>
    </Box>
  );
}
