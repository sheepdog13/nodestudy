import React from "react";
import Auth from "../../../hoc/auth";
import Header from "../Header/Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AboutMe from "./AboutMe";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const H1 = styled.h1`
  display: flex;
  font-size: 30px;
  font-weight: 500;
`;
const ContentBox = styled.div`
  @media (min-width: 820px) {
  }
  width: 100%;
  margin-top: 15px;
  padding: 0 2rem;
  gap: 15px;
  display: flex;
  flex-direction: row;
`;
const LeftContentBox = styled.div`
  display: flex;
  width: 300px;
`;
const RightContentBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boxBgColor};
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
    <>
      <Header />
      <Wrapper>
        <ContentBox>
          <LeftContentBox>
            <AboutMe />
          </LeftContentBox>
          <RightContentBox>
            {isLogin && <H1>반갑습니다 {username}님!</H1>}
          </RightContentBox>
        </ContentBox>
      </Wrapper>
    </>
  );
}

export default Auth(LandingPage, null);
