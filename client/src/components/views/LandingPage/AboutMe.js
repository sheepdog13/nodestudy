import React from "react";
import styled from "styled-components";
import SvgIcon from "@mui/material/SvgIcon";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  gap: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boxBgColor};
  color: ${(props) => props.theme.textColor};
`;

const Title = styled.div`
  @media (max-width: 820px) {
    font-size: 15px;
  }
  display: flex;
  font-size: 18px;
  font-weight: 700;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileBox = styled.div`
  @media (max-width: 820px) {
    width: 30%;
    gap: 12px;
  }
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ProfileImg = styled.img`
  @media (max-width: 820px) {
    width: 120px;
    height: 120px;
  }
  width: 180px;
  height: 180px;
  margin-top: 15px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  @media (max-width: 820px) {
    font-size: 18px;
  }
  display: flex;
  font-size: 20px;
  font-weight: 900;
`;

const DescBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
`;

const ProfileDesc = styled.div`
  @media (max-width: 820px) {
    font-size: 13px;
  }
  font-size: 15px;
  color: #d9d9d9;
  opacity: 0.7;
`;

const IconBox = styled.div`
  @media (max-width: 820px) {
    gap: 15px;
  }
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 10px;
  svg {
    @media (max-width: 820px) {
      font-size: 25px;
    }
    font-size: 30px;
    &:hover {
      color: #b6dcec;
    }
  }
`;

const IntroBox = styled.div`
  @media (min-width: 820px) {
    display: none;
  }
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const IntroTite = styled.div`
  font-size: 30px;
  text-align: center;
  line-height: 1.3;
  font-weight: 700;
`;

const IntroDesc = styled.div`
  text-align: center;
  line-height: 1.5;
  font-size: 20px;
  font-weight: 500;
  color: #8c8c8c;
`;

function AboutMe() {
  return (
    <Wrapper>
      <Title>About Me</Title>
      <ContentBox>
        <ProfileBox>
          <ProfileImg
            src={`${process.env.PUBLIC_URL}/img/bond.webp`}
            alt="bond"
          />
          <ProfileName>sheepdog</ProfileName>
          <DescBox>
            <ProfileDesc>FrontEnd Developer</ProfileDesc>
            <ProfileDesc>Busan, Korea</ProfileDesc>
          </DescBox>
          <IconBox>
            <SvgIcon
              onClick={() => {
                window.open("https://github.com/sheepdog13");
              }}
              component={GitHubIcon}
              fontSize={"inherit"}
            />
            <SvgIcon
              onClick={() => {
                window.open("https://www.instagram.com/jo_chang_uk/");
              }}
              component={InstagramIcon}
              fontSize={"inherit"}
            />
            <SvgIcon
              onClick={() => {
                window.open(`mailto:sheepdog13@naver.com`);
              }}
              component={AlternateEmailIcon}
              fontSize={"inherit"}
            />
          </IconBox>
        </ProfileBox>
        <IntroBox>
          <IntroTite>Blog</IntroTite>
          <IntroDesc>
            안녕하세요 자바스크립트를 <br /> 주로 다루는 기술 블로그입니다.
          </IntroDesc>
        </IntroBox>
      </ContentBox>
    </Wrapper>
  );
}

export default AboutMe;
