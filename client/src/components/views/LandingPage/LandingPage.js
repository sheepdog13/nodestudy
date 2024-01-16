import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { combineSlices } from "@reduxjs/toolkit";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log(res);
    } catch (err) {
      alert("로그아웃 실패");
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={logout}>로그아웃</button>
      LandingPage
    </div>
  );
}

export default LandingPage;
