import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formSignupData, setFormSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    birthdate: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [profilePictureError, setProfilePictureError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [signupError, setSignupError] = useState("");

  const validateFirstName = () => {
    if (formSignupData.firstName.trim() === "") {
      setFirstNameError("First name cannot be empty");
      return false;
    }

    setFirstNameError("");
    return true;
  };

  const validateLastName = () => {
    if (formSignupData.lastName.trim() === "") {
      setLastNameError("Last name cannot be empty");
      return false;
    }

    setLastNameError("");
    return true;
  };

  const validateEmail = () => {
    if (formSignupData.email.trim() === "") {
      setEmailError("Email cannot be empty");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formSignupData.email)) {
      setEmailError("Please enter a valid email");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (formSignupData.password.trim() === "") {
      setPasswordError("Password cannot be empty");
      return false;
    }

    if (formSignupData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (formSignupData.confirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm your password");
      return false;
    }

    if (formSignupData.confirmPassword !== formSignupData.password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  const validateProfilePicture = () => {
    if (!formSignupData.profilePicture) {
      setProfilePictureError("Please select a profile picture");
      return false;
    }

    setProfilePictureError("");
    return true;
  };

  const validateBirthdate = () => {
    if (formSignupData.birthdate === "") {
      setBirthdateError("Birthdate cannot be empty");
      return false;
    }

    setBirthdateError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormSignupData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");
    const firstNameValid = validateFirstName();
    const lastNameValid = validateLastName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();
    const profilePictureValid = validateProfilePicture();
    const birthdateValid = validateBirthdate();

    if (
      !firstNameValid ||
      !lastNameValid ||
      !emailValid ||
      !passwordValid ||
      !confirmPasswordValid ||
      !profilePictureValid ||
      !birthdateValid
    ) {
      return;
    }

    const data = new FormData();

    data.append("firstName", formSignupData.firstName);
    data.append("lastName", formSignupData.lastName);
    data.append("email", formSignupData.email);
    data.append("password", formSignupData.password);
    data.append("birthdate", formSignupData.birthdate);
    data.append("profilePicture", formSignupData.profilePicture);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}signup`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        setSignupError(result.error || "Signup failed. Please try again.");
        return;
      }
      navigate("/login");
    } catch (error) {
      console.log("Error sending signup:", error);
      setSignupError("Unable to connect to the server. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {signupError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{signupError}</p>
        )}

        <input
          type="text"
          placeholder="First Name"
          required
          name="firstName"
          value={formSignupData.firstName}
          onChange={handleChange}
          onBlur={validateFirstName}
        />

        {firstNameError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{firstNameError}</p>
        )}

        <input
          type="text"
          placeholder="Last Name"
          required
          name="lastName"
          value={formSignupData.lastName}
          onChange={handleChange}
          onBlur={validateLastName}
        />

        {lastNameError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{lastNameError}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={formSignupData.email}
          onChange={handleChange}
          onBlur={validateEmail}
        />

        {emailError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{emailError}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={formSignupData.password}
          onChange={handleChange}
          onBlur={validatePassword}
        />

        {passwordError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{passwordError}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          required
          name="confirmPassword"
          value={formSignupData.confirmPassword}
          onChange={handleChange}
          onBlur={validateConfirmPassword}
        />

        {confirmPasswordError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{confirmPasswordError}</p>
        )}

        <label htmlFor="profilePicture">Profile Picture</label>

        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          name="profilePicture"
          onChange={handleChange}
        />

        {profilePictureError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{profilePictureError}</p>
        )}

        <label htmlFor="birthdate">Birthdate</label>

        <input
          id="birthdate"
          type="date"
          required
          name="birthdate"
          value={formSignupData.birthdate}
          onChange={handleChange}
          onBlur={validateBirthdate}
        />

        {birthdateError !== "" && (
          <p style={{ color: "red", fontSize: 14 }}>{birthdateError}</p>
        )}

        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
