---
date: "2024-03-02"
title: "JWT 이란? (Access Token & Refresh Token)"
imgpath: "/img/jwt/cover.png"
---

# JWT 이란? (Access Token & Refresh Token)

## JWT (JSON Web Token) 이란?

JWT(JSON Web Token)란 인증에 필요한 정보들을 암호화시킨 JSON 토큰을 의미한다.

![jwt](../img/jwt/1.png)

## JWT 구조

![jwt](../img/jwt/2.png)

위가 jwt 토큰의 모습이다 토큰은. 을 기준으로 세 부분으로 나누어져 있다

1. header : JWT 에서 사용할 타입과 해시 알고리즘의 종류
2. **Payload** : 유저에 대한 정보
3. Signature : 내가 정의한 secret Key

## JWT 토큰을 가지고 있을때 인증 과정

![jwt](../img/jwt/3.png)

jwt 토큰을 발급 받을때만 DB를 거치고 그다음의 인증요청때는 서버만 거치기 때문에 jwt 로그인 방식은 다른 로그인 방식보다 빠르다

## AccessToken, RefreshToken

![jwt](../img/jwt/4.png)

지금 블로그의 로그인 방식 입니다.

서버에서 access토큰은 body로 보내고 refresh토큰은 cookie에 저장했습니다

access 토큰은 header에 고정해서 api요청을 할때마다 같이 보내고 유효 시간은 5분으로 설정(5분뒤 요청을 보내면 refresh 토큰으로 다시 access 토큰을 발급 받아야 합니다)

```js
const httpClientForCredentials = axios.create({
  baseURL: "https://nodestudy-34u2.onrender.com",

  withCredentials: true,
});

httpClientForCredentials.defaults.headers.common[
  "Authorization"
] = `Bearer ${action.payload.accesstoken}`;
```

refresh토큰은 유효 시간을 2주로 설정하고 access토큰이 유효하지 않을때 서버에서 req.cookie로 접근해서 확인후 access토큰, refresh토큰을 발급합니다.
