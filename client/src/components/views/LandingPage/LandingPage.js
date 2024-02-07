import React from "react";
import Auth from "../../../hoc/auth";
import Header from "../Header/Header";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  display: flex;
  font-size: 30px;
  font-weight: 500;
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
  const username = useSelector((state) => state.user.auth.name);
  const isLogin = useSelector((state) => state.user.auth.isAuth);

  return (
    <Wapper>
      <Header />
      {isLogin && <H1>반갑습니다 {username}님!</H1>}
    </Wapper>
  );
}

export default Auth(LandingPage, null);
