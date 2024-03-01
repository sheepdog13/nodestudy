import React from "react";
import { Helmet } from "react-helmet-async";

function MetaTag(props) {
  const { type = "home", title, desc, img, url } = props;
  return type === "home" ? (
    <Helmet>
      <title>sheepdog13blog</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="자바스크립트를 주로 다루는 기술 블로그입니다."
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="sheepdog13 | 블로그" />
      <meta property="og:site_name" content="sheepdog13 | 블로그" />
      <meta
        property="og:description"
        content="자바스크립트를 주로 다루는 기술 블로그입니다."
      />
      <meta
        property="og:image"
        content="https://sheepdog13.blog/img/bond.webp"
      />
      <meta property="og:url" content="https://sheepdog13.blog/" />
    </Helmet>
  ) : (
    <>
      {title && (
        <Helmet>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content={title} />
          <meta
            property="og:url"
            content={`https://sheepdog13.blog/post/${url}`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={title} />
          <meta name="og:description" content={desc} />
          <meta property="og:image" content={`https://sheepdog13.blog${img}`} />
        </Helmet>
      )}
    </>
  );
}

export default MetaTag;
