import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context";
import "./HomePage.css";
import { Button } from "../../components";
import axios from "axios";

export const HomePage = () => {
  const { loading, currentUser, setCurrentUser } = useUserContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/tasks", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    currentUser && fetchData();
  }, [currentUser]);

  console.log(data);

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
          <h1>{currentUser.user.username}</h1>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      ) : (
        "Guest"
      )}
      <div style={{ margin: "20px", gap: "20px" }}>
        {data.map((task) => (
          <div key={task._id} style={{ margin: "20px" }}>
            {task.name}
          </div>
        ))}
      </div>
    </div>
  );
};
