import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import fm from "front-matter";
import axios from "axios";
import { useParams } from "react-router-dom";

const StyledCodeBlock = styled(SyntaxHighlighter)`
  border-radius: 8px;
`;

function PostPage() {
  const { failename } = useParams();

  const [markdownContent, setMarkdownContent] = useState("");
  // markdown 파일을 가져와서 text로 변환
  useEffect(() => {
    const getMarkdown = async (failename) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/post/${failename}`
        );
        const parsedMarkdown = fm(response.data);
        setMarkdownContent(parsedMarkdown.body);
      } catch (err) {
        console.log("err", err);
      }
    };
    getMarkdown(failename);
  }, [failename]);

  return (
    <div>
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
    </div>
  );
}

export default PostPage;
