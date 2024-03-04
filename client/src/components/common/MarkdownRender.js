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
    @media (max-width: 400px) {
      font-size: 28px;
      line-height: 1.4;
    }
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
  h3 {
    @media (max-width: 400px) {
      font-size: 17px;
      line-height: 1.4;
      margin-top: 15px;
    }
    font-size: 20px;
    line-height: 1.2;
    font-weight: 500;
    margin-top: 30px;
  }
  a {
    font-size: 16px;
    color: #7fcde1;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: #7fcde1;
    }
  }
  pre {
    @media (max-width: 400px) {
      margin-top: 15px;
    }
  }
  img {
    border-radius: 20px;
    width: 100%;
  }
`;

function MarkdownRender(props) {
  const { markdownContent } = props;
  const renderers = {
    a: ({ children, href }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <StyledCodeBlock
          {...props}
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </StyledCodeBlock>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };
  return (
    <Wrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
        {markdownContent}
      </ReactMarkdown>
    </Wrapper>
  );
}

export default MarkdownRender;
