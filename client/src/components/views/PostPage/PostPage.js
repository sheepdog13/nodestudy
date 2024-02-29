import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fm from "front-matter";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import MarkdownRender from "../../common/MarkdownRender";
import Comment from "../../common/Comment";
import MetaTag from "../../common/MetaTag";

const Wrapper = styled.div`
  @media (max-width: 400px) {
    padding: 50px 1rem;
  }
  width: 100%;
  height: 100%;
  padding: 50px 10rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Preview = styled.div`
  @media (max-width: 400px) {
    gap: 10px;
    margin-top: 30px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`;

const Date = styled.p`
  color: #d9d9d9;
  font-weight: 500;
`;

const Title = styled.h1`
  @media (max-width: 400px) {
    font-size: 20px;
    line-height: 1.4;
    font-weight: 700;
  }
  text-align: center;
  font-size: 40px;
  line-height: 1.2;
  font-weight: 700;
`;

const Thumbnail = styled.img`
  @media (max-width: 400px) {
    margin-top: 20px;
    height: 200px;
  }
  width: 100%;
  height: 400px;
  border-radius: 20px;
  object-fit: cover;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 15px;
`;

function PostPage() {
  const { failename } = useParams();

  const [markdownContent, setMarkdownContent] = useState("");
  const [markdownData, setMarkdownData] = useState();
  // markdown 파일을 가져와서 text로 변환
  useEffect(() => {
    const getMarkdown = async (failename) => {
      try {
        const response = await axios.get(
          `https://nodestudy-34u2.onrender.com/post/${failename}`
        );
        const parsedMarkdown = fm(response.data);
        setMarkdownContent(parsedMarkdown.body);
        setMarkdownData(parsedMarkdown.attributes);
      } catch (err) {
        console.log("err", err);
      }
    };
    getMarkdown(failename);
  }, [failename]);

  return (
    <>
      <MetaTag
        type="posting"
        title={markdownData?.title}
        desc={markdownData?.title}
        img={markdownData?.imgpath}
      />
      <Header />
      <Wrapper>
        <Preview>
          <Date>{markdownData?.date}</Date>
          <Title>{markdownData?.title}</Title>
          <Thumbnail src={markdownData?.imgpath} />
        </Preview>
        <ContentBox>
          <MarkdownRender markdownContent={markdownContent} />
        </ContentBox>
        <Comment />
      </Wrapper>
    </>
  );
}

export default PostPage;
