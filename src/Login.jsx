import { useState } from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formLoginData, setFormLoginData] = useState({
    username: "",
    password: "",
  });

  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Validate username
  const validateUsername = () => {
    if (formLoginData.username.trim() === "") {
      setUserError("Username cannot be empty");
      return false;
    }

    setUserError("");
    return true;
  };

  const validatePassword = () => {
    if (formLoginData.password.trim() === "") {
      setPassError("Password cannot be empty");
      return false;
    }

    setPassError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValid = validateUsername();
    const passwordValid = validatePassword();

    if (!usernameValid || !passwordValid) {
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLoginData),
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.log("Error logging in:", error);
      setLoginError("Unable to connect to the server. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {loginError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{loginError}</p>
        )}
        <input
          type="text"
          placeholder="Enter the username(email)"
          value={formLoginData.username}
          name="username"
          onChange={handleChange}
          onBlur={validateUsername}
        />

        {userError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{userError}</p>
        )}

        <input
          type="password"
          value={formLoginData.password}
          name="password"
          onChange={handleChange}
          onBlur={validatePassword}
          placeholder="Password"
        />

        {passError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{passError}</p>
        )}

        <Button variant="contained" type="submit">
          Login
        </Button>

        <p style={{ marginLeft: "40px" }}>
          Do not have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "inherit",
            }}
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
