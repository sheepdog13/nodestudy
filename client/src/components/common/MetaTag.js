import React from "react";
import { Helmet } from "react-helmet-async";

function MetaTag(props) {
  const { type = "home", title, desc, img } = props;
  return type === "home" ? (
    <Helmet>
      <title>sheepdog13blog</title>
      <meta
        name="description"
        content="자바스크립트를 주로 다루는 기술 블로그입니다."
      />
      <meta name="keywords" content="blog" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="sheepdog13" />
      <meta property="og:site_name" content="sheepdog13" />
      <meta
        property="og:description"
        content="자바스크립트를 주로 다루는 기술 블로그입니다."
      />
      <meta property="og:image" content="/img/bond.webp" />
      <meta property="og:url" content="https://sheepdog13.blog" />
    </Helmet>
  ) : (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content="post" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={`${img}`} />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
}

export default MetaTag;
