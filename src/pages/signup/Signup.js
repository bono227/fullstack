import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../../components";
import "./Signup.css";
import axios from "axios";
import { useUserContext } from "../../context";

export const SignUpPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setCurrentUser } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.username && userData.email && userData.password) {
      try {
        const response = await axios.post("http://localhost:9000/auth/signup", {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });

        const { data } = response;

        localStorage.setItem("user", JSON.stringify(data));

        setCurrentUser(data);

        setUserData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div id="sign-up-container">
      <div className="form-container">
        <h1>Sign Up</h1>

        <TextField
          className="inputStyle"
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <TextField
          className="inputStyle"
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <TextField
          className="inputStyle"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
        <Link to={"/signin"}>Already have an Account?</Link>
        {error && <p style={{ color: "red", fontWeight: "700" }}>{error}</p>}
      </div>
    </div>
  );
};
