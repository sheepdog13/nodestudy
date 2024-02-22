import React, { useEffect, useState } from "react";
import Auth from "../../../hoc/auth";
import Header from "../Header/Header";
import styled from "styled-components";
import AboutMe from "./AboutMe";
import PostCard from "./PostCard";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 120px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const ContentBox = styled.div`
  @media (max-width: 820px) {
    flex-direction: column;
  }
  width: 100%;
  height: 100%;
  margin-top: 15px;
  padding: 0 2rem;
  gap: 15px;
  display: flex;
  flex-direction: row;
`;
const LeftContentBox = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  @media (max-width: 820px) {
    width: 100%;
  }
`;
const RightContentBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

function LandingPage() {
  const [postArray, setPostArray] = useState([]);
  useEffect(() => {
    const getMarkdown = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allmarkdown");
        setPostArray(response.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    getMarkdown();
  }, []);
  return (
    <>
      <Header />
      <Wrapper>
        <ContentBox>
          <LeftContentBox>
            <AboutMe />
          </LeftContentBox>
          <RightContentBox>
            {postArray.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </RightContentBox>
        </ContentBox>
      </Wrapper>
    </>
  );
}

export default Auth(LandingPage, null);
