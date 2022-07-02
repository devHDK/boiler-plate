import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/hello").then((Response) => console.log(Response.data));
  }, []);

  const OnClickHandler = () => {
    axios.get("/api/users/logout").then((Resoponse) => {
      if (Resoponse.data.success) {
        console.log("Logout Success");
        navigate("/Login");
      } else {
        console.log("Logout Fail");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <br />
      <button onClick={OnClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
