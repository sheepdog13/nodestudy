---
date: "2024-03-02"
title: "JWT 란? (Access Token & Refresh Token)"
imgpath: "/img/jwt/cover.png"
---

# JWT 란? (Access Token & Refresh Token)

## JWT (JSON Web Token) 란?

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

![jwt](../img/jwt/5.jpeg)

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

## 백과 프론트가 도메인이 다를때 쿠키 주고 받기

도메인은 지금 블로그 url중 sheepdog13.blog부분 입니다.

제 블로그는 서버는 [render](render.com) PaaS(Platform as a Service) 서비스로 배포 하고, 프론트는 aws cloudfront를 이용해서 서로 도메인이 다릅니다. 도메인이 다를때 쿠키를 교환할려면

1. https 설정을 해야합니다.
2. cookie 속성중 하나인 sameSite 속성을 none으로 설정해야 합니다.

### 1. https 설정

백은 PaaS 서비스를 이용했기 때문에 https 설정이 따로 필요 없었지만
프론트는 AWS Certificate Manager(ACM)에서 SSL인증서로 설정 했습니다.

### 2. sameSite 속성

sameSite 속성은 쿠키가 어떤 상황에서 브라우저에 전송되는지를 제어합니다.

SameSite 쿠키 속성에는 세 가지 값이 있는데

1. Strict: Strict로 설정된 쿠키는 항상 같은 사이트의 요청에서만 전송됩니다.
2. Lax: SameSite가 Lax로 설정된 쿠키는 외부 사이트에서 GET 방식으로 보내는 요청에 대해서는 전송됩니다.
3. None: SameSite가 None으로 설정된 쿠키는 외부 사이트로부터의 요청에 대해 제한이 없습니다. HTTPS 연결을 사용하는 경우에만 허용되기 때문에 https 설정을 해야합니다.

```js
// user 정보와 access 토큰을 받아온다.
const [userdata, accesstoken] = await user.generateToken();
// refresh 토큰의 옵션
const options = {
  httpOnly: true,
  sameSite: "None",
  secure: true,
  // 2주
  maxAge: 14 * 24 * 60 * 60 * 1000,
};
// access 토큰은  body로 넘겨주고 refresh 토큰은 cookie에 저장한다.
res.cookie("refreshtoken", userdata.token, options).status(200).json({
  accesstoken,
  loginSuccess: true,
  name: userdata.name,
});
```

cors설정은 볼륨이 많이 질 거 같아서 다음 포스팅 때 정리하겠습니다.
