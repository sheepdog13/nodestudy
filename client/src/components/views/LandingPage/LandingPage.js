import React, { useEffect } from "react";
import axios from "axios";
import Auth from "../../../hoc/auth";
import NavBar from "../NavBar/NavBar";
import styled from "styled-components";

const Wapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function LandingPage() {
  useEffect(() => {
    axios
      .get("https://nodestudy-34u2.onrender.com/api/hello")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  // const logout = async () => {
  //   try {
  //     const res = await axios.get("/api/users/logout");
  //     console.log(res);
  //   } catch (err) {
  //     alert("로그아웃 실패");
  //     console.log(err);
  //   }
  // };
  return (
    <Wapper>
      <NavBar />
    </Wapper>
  );
}

export default Auth(LandingPage, null);
