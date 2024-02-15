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
  display: flex;
  font-size: 18px;
  font-weight: 700;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ProfileImg = styled.img`
  width: 180px;
  height: 180px;
  margin-top: 15px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
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
  font-size: 15px;
  color: #d9d9d9;
  opacity: 0.7;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 10px;
  svg {
    font-size: 30px;
  }
`;

function AboutMe() {
  return (
    <Wrapper>
      <Title>About Me</Title>
      <ContentBox>
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
          <SvgIcon component={GitHubIcon} fontSize={"inherit"} />
          <SvgIcon component={InstagramIcon} fontSize={"inherit"} />
          <SvgIcon component={AlternateEmailIcon} fontSize={"inherit"} />
        </IconBox>
      </ContentBox>
    </Wrapper>
  );
}

export default AboutMe;
