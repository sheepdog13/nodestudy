---
date: "2024-03-13"
title: "카카오톡 공유하기 리액트"
imgpath: "/img/kakao/cover.jpeg"
---

# 카카오톡 공유하기 리액트

## 1. react로 구현한 프로젝트 메타태그 정의 문제

지금하고 있는 프로젝트는 간단한 수학문제를 푸는 프로젝트로 공유나 SEO(검색 최적화)를 잘하는게 중요하다고 생각했습니다.

![kakao](../img/kakao/1.png)

react는 csr로써 하나의 index.html만 올라가 있기 때문에
동적인 메타태그를 정의하는데 어려움이 있습니다.
그래서 생각해본 문제 해결방식은

1. ssr로 마이그레이션 한다.
2. csr에서 seo를 해결해본다.

1번방식은 지금 블로그 또한 react로 구현했기 때문에 ssr로 마이그레이션 해보기로 결정하고

수학문제를 푸는 프로젝트는 2번방식으로 해결하기로 결정했습니다.

## 2. 임시방편으로 csr에서 seo 최적화하기

### 참고자료

- [SPA에서 서버사이드 렌더링을 구축하지 않고 SEO 최적화하기](https://byseop.netlify.app/csr-seo/)

블로그를 보고 열심히 만들어봤지만 react-snap에서 각 페이지별 index.html 파일이 생성 시점에서 문제가 생겼습니다.

그래서 생각한 해결 방식

1. 메타태그는 public의 index.html에 정리
2. 공유하기는 kakao SDK를 이용해 구현

## 3. kakao 공유하기

### 준비해야 할 사항

1. kakao developers에서 애플리케이션 등록이 필요합니다.
2. 카카오톡 공유하기 기능을 사용하기 위해서는 JavaScript 키가 필요하다.

- [gallery-k님 블로그](https://gallery-k.tistory.com/421)

### 1. JavaScript SDK 추가

저는 [기능 미리보기 및 테스트](https://developers.kakao.com/tool/demo/message/kakaolink?default_template=feed)여기서 SDK 들고 왔습니다.

public index.html의 head안에 적용

```html
<head>
  <title>react</title>
  <script
    src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
    integrity="sha384-l+xbElFSnPZ2rOaPrU//2FF5B4LB8FiX5q4fXYTlfcG4PGpMkE1vcL7kNXI6Cci0"
    crossorigin="anonymous"
  ></script>
</head>
```

### 2. 초기화하기

```js
const { Kakao }: any = window;

useEffect(() => {
  // init 해주기 전에 clean up 을 해준다.
  Kakao.cleanup();
  // 자신의 JavaScript 키를 넣어줍니다.
  Kakao.init(process.env.REACT_APP_KAKAO);
  // 잘 적용되면 true를 반환해줍니다.
  console.log(Kakao.isInitialized());
}, []);
```

### 3. 카카오톡 공유하기 예시 코드

button 태그에 적용하면 됩니다.

```js
const shareKakao = () => {
  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "딸기 치즈 케익",
      description: "#케익 #딸기 #삼평동 #카페 #분위기 #소개팅",
      imageUrl:
        "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
      link: {
        mobileWebUrl: "https://developers.kakao.com",
        webUrl: "https://developers.kakao.com",
      },
    },
    buttons: [
      {
        title: "웹으로 보기",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
    ],
  });
};
```

### 4. 결과

![kakao](../img/kakao/2.png)

[기능 미리보기 및 테스트](https://developers.kakao.com/tool/demo/message/kakaolink?default_template=feed) 여기서 여러가지 테스트 해보세요

### git issue

- [카카오톡 공유하기 버튼 구현](https://github.com/sheepdog13/brainfullpower/issues/5)

### 참고자료

- [카카오톡 공유하기](https://developers.kakao.com/tool/demo/message/kakaolink?message_type=default)
- [https://gallery-k.tistory.com/421](https://gallery-k.tistory.com/421)
- [https://velog.io/@bokjunwoo/wm70xwdj](https://velog.io/@bokjunwoo/wm70xwdj)
