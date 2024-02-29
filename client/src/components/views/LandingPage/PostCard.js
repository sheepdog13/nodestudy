import React from "react";
import styled from "styled-components";
import fm from "front-matter";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  @media (max-width: 400px) {
    padding: 10px;
    gap: 15px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boxBgColor};
`;

const Thumbnail = styled.img`
  @media (max-width: 400px) {
    height: 200px;
  }
  width: 100%;
  border-radius: 10px;
  height: 316px;
  object-fit: cover;
`;

const Date = styled.div`
  @media (max-width: 400px) {
    font-size: 15px;
  }
  font-size: 18px;
`;

const Title = styled.p`
  @media (max-width: 400px) {
    font-size: 20px;
    line-height: 1.2;
  }
  overflow-wrap: break-word;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.2;
`;

function PostCard(props) {
  const navigate = useNavigate();
  const { post } = props;

  const getFileNameWithoutExtension = (filename) => {
    // 파일명을 점(.)을 기준으로 분할하여 배열로 만듭니다.
    const parts = filename.split(".");

    // 배열의 마지막 요소를 제거하여 파일의 확장자를 제거합니다.
    parts.pop();

    // 배열의 나머지 요소를 다시 합쳐서 파일명으로 반환합니다.
    const filenameWithoutExtension = parts.join(".");

    return filenameWithoutExtension;
  };

  const filename = getFileNameWithoutExtension(post.filename);

  const postData = fm(post.content).attributes;
  return (
    <Wrapper
      onClick={() => {
        navigate(`/post/${filename}`);
      }}
    >
      <Thumbnail src={`${process.env.PUBLIC_URL}${postData.imgpath}`} />
      <Date>{postData.date}</Date>
      <Title>{postData.title}</Title>
    </Wrapper>
  );
}

export default PostCard;
