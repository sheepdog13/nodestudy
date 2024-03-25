---
date: "2024-03-22"
title: "next13 seo 정리"
imgpath: "/img/seo/cover.png"
---

# next13 seo 정리

## 1. generateMetadata로 metadata 동적 생성

![seo](../img/seo/1.png)

페이지별 또는 id 파라미터의 유무에 따라 다른 metadata를 생성하는 모습을 볼 수 있다.

- generateMetadata함수는 next에서 제공되는 함수 입니다
- head영역에 metadata를 동적 생성 할 수 있습니다.
- 제 경우에는 id가 있을경우 id에 해당되는 영화의 이미지,제목,설명을 동적으로 생성하고 있습니다.
- 만약 id가 없을경우 홈페이지에 해당되는 metadata를 반환합니다.

```js
// app/page.tsx
export async function generateMetadata(params: Params): Promise<Metadata> {
  const id = params.searchParams.id;
  const movie = await getMovie(id);
  const idImg = movie?.poster_path
    ? makeImagePath(movie.poster_path) || makeImagePath(movie.backdrop_path)
    : "/img/bond.webp";
  return {
    title: `${id ? movie.title : "홈페이지"}`,
    description: `${id ? movie.overview : "nexflix 클론코딩 사이트" || ""}`,
    openGraph: {
      images: `${
        id ? idImg : "https://joflix-coral.vercel.app/img/homepreview.png"
      }`,
    },
    verification: { google: "pQ1HYdIr6PZIM0nUWK8VFx_m9vvOX4LYGbZ0Uba4mbE" },
  };
}
```

### 참고자료

- [next 공식문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## 2. 시멘틱 태그로 변경

시맨틱 태그를 사용하면 검색 엔진은 페이지의 구조를 더 잘 이해할 수 있습니다.

## 3. sitemap.xml, robots.txt 생성

### 3.1 Sitemap.xml은 검색 엔진이 웹 사이트를 색인하는 데 도움을 주는 XML 파일입니다.

- next에서 제공해주는 sitemap()을 사용해 생성 할 수 있습니다.
- app/sitemap.ts 경로로 만들면 build시 sitemap.xml 파일을 생성해줍니다.

```js
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://acme.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
```

### 3.2 robots.txt는 검색 엔진 크롤러에게 웹 사이트의 어떤 부분을 크롤링할 수 있는지에 대한 지침을 제공하는 텍스트 파일입니다.

- public 폴더 안에 생성 했습니다.
- 특정 웹사이트 URL 뒤에 /robots.txt 를 입력하면
  다른 웹사이트가 어떻게 robots.txt 파일을 적용시키고 있는지 확인할 수 있습니다.

![seo](../img/seo/2.png)

```js
// public/robosts.txt
# public/robots.txt

User-agent: *
Allow: /


Sitemap: https://https://joflix-coral.vercel.app/sitemap.xml
```

### 참고자료

- [next 공식문서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

## 4. 구글 서치 콘솔 등록

구글 서치 콘솔은 구글의 검색 엔진에서 웹사이트를 모니터링하고 최적화하는 도구입니다. 웹사이트를 구글 서치 콘솔에 등록하면 해당 웹사이트에 대한 검색 결과를 분석하고 향상시킬 수 있는 다양한 정보를 얻을 수 있습니다.

![seo](../img/seo/3.png)

### 참고자료

- [구글 서치 콘솔 등록법](https://imweb.me/faq?&mode=view&category=29&category2=35&idx=72135)

위 블로그를 참고해서 등록했습니다.
next에서 head에 구글 verification을 넣는 방법은
generateMetadata함수를 쓰는 경우 verification 옵션을 사용해서 넣어 주시면 됩니다.

```js
export async function generateMetadata(params: Params): Promise<Metadata> {
  const id = params.searchParams.id;
  const movie = await getMovie(id);
  const idImg = movie?.poster_path
    ? makeImagePath(movie.poster_path) || makeImagePath(movie.backdrop_path)
    : "/img/bond.webp";
  return {
    title: `${id ? movie.title : "홈페이지"}`,
    description: `${id ? movie.overview : "nexflix 클론코딩 사이트" || ""}`,
    openGraph: {
      images: `${
        id ? idImg : "https://joflix-coral.vercel.app/img/homepreview.png"
      }`,
    },
    verification: { google: "pQ1HYdIr6PZIM0nUWK8VFx_m9vvOX4LYGbZ0Uba4mbE" },
  };
}
```

### git issue

- [seo 최적화](https://github.com/sheepdog13/joflix/issues/9)
