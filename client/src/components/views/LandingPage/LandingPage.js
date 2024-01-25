import React, { useEffect } from "react";
import axios from "axios";
import Auth from "../../../hoc/auth";

function LandingPage() {
  useEffect(() => {
    axios
      .get("https://nodestudy-34u2.onrender.com/api/hello")
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
      gitactions로 배포 테스트 오타 수정
    </div>
  );
}

export default Auth(LandingPage, null);
