import React from "react";
import { useUserContext } from "../../context";
import "./HomePage.css";
import { Button } from "../../components";

export const HomePage = () => {
  const { loading, currentUser, setCurrentUser } = useUserContext();

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(loading, currentUser);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {currentUser ? (
        <div>
          {currentUser.username}
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      ) : (
        "Guest"
      )}
    </div>
  );
};
