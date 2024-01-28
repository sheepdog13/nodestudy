import React, { useEffect } from "react";
import axios from "axios";
import Auth from "../../../hoc/auth";
import Header from "../Header/Header";
import styled from "styled-components";

const Wapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function LandingPage() {
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
      <Header />
    </Wapper>
  );
}

export default Auth(LandingPage, null);
