import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import axios from "../../api/api";
import { Box } from "../../components/Box/box";
import TextInput from "../../components/Input/input";
import Select from "../../components/Select/select";

const REGISTER_URL = "/users";

interface ISetValue {
  username: string;
  password: string;
  roles: string[];
}

export default function Register() {
  const sampleInput = [
    {
      uniqueId: 1,
      labelId: "username",
      inputName: "Username",
      placeholder: "john.doe",
      type: "text",
      required: true,
      errorMessage: "Please enter a valid username address.",
      icon: <i className="bi bi-person"></i>,
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

  const option = ["Employee", "Admin"];

  const [value, setValue] = useState({
    username: "",
    password: "",
    roles: [option[0]],
  });

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setErrMsg("");
  }, [value]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify(value), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const message = response?.data?.message;
      console.log(message);
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
      <h1>Register</h1>
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

        <Select
          label="Role"
          option={option}
          value={value.roles}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const options = [...e?.target?.selectedOptions];
            const values = options.map((option) => option.value);
            setValue({ ...value, roles: values });
          }}
        />

        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <button type="submit">Register</button>
      </form>
    </Box>
  );
}
