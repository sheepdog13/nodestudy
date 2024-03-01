import React from "react";
import Giscus from "@giscus/react";
import { useSelector } from "react-redux";

function Comment() {
  const isDark = useSelector((state) => state.darkmode.isDark);
  const theme = isDark ? "dark" : "light";
  return (
    <>
      <Giscus
        id="comments"
        repo="sheepdog13/blogcomment"
        repoId="R_kgDOLZClrw"
        category="Announcements"
        categoryId="DIC_kwDOLZClr84CdlHA"
        mapping="title"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="ko"
      />
    </>
  );
}

export default Comment;
