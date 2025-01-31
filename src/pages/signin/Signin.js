import React, { useState } from "react";
import "./Signin.css";
import { Button, TextField } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context";

export const SignInPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
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

    if (userData.email && userData.password) {
      try {
        const response = await axios.post("http://localhost:9000/auth/signin", {
          email: userData.email,
          password: userData.password,
        });
        const { data } = response;
        localStorage.setItem("user", JSON.stringify(data));

        setCurrentUser(data);

        setUserData({
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
    <div id="sign-in-container">
      <form className="form-container">
        <h1>Sign In</h1>

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
          Sign In
        </Button>
        <Link to={"/sign-up"}>No Account?</Link>
        {error && <p style={{ color: "red", fontWeight: "700" }}>{error}</p>}
      </form>
    </div>
  );
};
