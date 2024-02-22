import React from "react";
import styled from "styled-components";
import fm from "front-matter";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boxBgColor};
`;

const Thumbnail = styled.img`
  border-radius: 10px;
  height: 316px;
  object-fit: cover;
`;

const Date = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const Title = styled.p`
  margin-top: 20px;
  overflow-wrap: break-word;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.2;
`;

function PostCard(props) {
  const { post } = props;
  const postData = fm(post.content).attributes;
  return (
    <Wrapper>
      <Thumbnail src={`${process.env.PUBLIC_URL}${postData.imgpath}`} />
      <Date>{postData.date}</Date>
      <Title>{postData.title}</Title>
    </Wrapper>
  );
}

export default PostCard;
