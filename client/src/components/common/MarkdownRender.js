import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

const StyledCodeBlock = styled(SyntaxHighlighter)`
  border-radius: 8px;
  span {
    font-size: 15px;
    @media (max-width: 400px) {
      font-size: 13px;
    }
  }
`;

const Wrapper = styled.div`
  @media (max-width: 400px) {
    font-size: 15px;
    line-height: 1.6;
  }
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  margin-top: 16px;
  font-weight: 400;
  line-height: 2;
  p {
    @media (max-width: 400px) {
      font-size: 15px;
      line-height: 1.6;
    }
    font-size: 16px;
    margin-top: 16px;
    font-weight: 400;
    line-height: 2;
  }
  h1 {
    font-size: 36px;
    line-height: 1.2;
    font-weight: 500;
  }
  h2 {
    @media (max-width: 400px) {
      font-size: 20px;
      line-height: 1.4;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    font-size: 32px;
    line-height: 1.2;
    font-weight: 500;
    margin-top: 80px;
    margin-bottom: 40px;
  }
  pre {
    @media (max-width: 400px) {
      margin-top: 15px;
    }
  }
  img {
    width: 100%;
    margin: 25px 0px;
  }
`;

function MarkdownRender(props) {
  const { markdownContent } = props;
  return (
    <Wrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              // !inline && match 조건에 맞으면 하이라이팅
              <StyledCodeBlock
                {...props}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </StyledCodeBlock>
            ) : (
              // 안 맞다면 문자열 형태로 반환
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </Wrapper>
  );
}

export default MarkdownRender;
