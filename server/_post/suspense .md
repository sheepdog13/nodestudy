---
date: "2024-04-03"
title: "next13 버전 suspense 정리"
imgpath: "/img/suspense/cover.jpeg"
---

# next13 버전 suspense 정리

## 1. Intro

joflix는 넷플릭스를 next13 버전으로 클론코딩한 프로젝트입니다.
suspense를 적용시켜보고 싶어 공부한 내용과 제 프로젝트로 어떻게 작동하는지 설명하겠습니다.

## 2. SSR

SSR(서버사이드 렌더링) next 렌더링 흐름은 다음과 같습니다.

1. 서버 컴포넌트의 data fetching
2. fetching한 데이터를 사용하여 html을 그려 보여주고
3. js파일을 다운후
4. html에 js로직을 연결합니다.

4번의 과정을 hydration(수분 보충)이라고 합니다.

hydration안된 html 즉,2번 상태의 html은 버튼 클릭과 같은 인터랙티브한 반응이 불가능합니다.

멋지게 표현한다면 TTV(Time to View)와 TTI(Time to Interactive)간에 시간 간격이 존재한다.라고 표현할 수 있습니다.

### TTV

- Time To View
- 사용자가 웹 사이트를 볼 수 있는 시간

### TTI

- Time To Interact
- 사용자가 웹 사이트와 상호작용(클릭 등)을 할 수 있는 시간

### 참고자료

- [React 18의 새로운 Suspense SSR 아키텍처](https://github.com/reactwg/react-18/discussions/37)

## 3. SSR의 문제점

**HTML을 보여주기 전에 모든 것을 가져와야 합니다.**

현재 API를 사용하면 HTML로 렌더링할 때 이미 서버의 구성 요소에 대한 모든 데이터가 준비되어 있어야 합니다. 이는 HTML 을 클라이언트에 보내기 전에 서버에서 모든 데이터를 수집해야 함 을 의미합니다. 이는 상당히 비효율적입니다.

예시로 저의 프로젝트로 설명 하겠습니다.

제 프로젝트의 레이아웃 입니다.
![seo](../img/suspense/3.png)

프로젝트 홈페이지
![seo](../img/suspense/4.png)

- [프로젝트 링크](https://joflix-coral.vercel.app/)

홈페이지 page.tsx

```js
// app/page.tsx
export default function Home() {
  return (
    <main>
      <Screen />
      <div className=" absolute w-full pb-5 top-2/3 sm:top-3/4">
        <Slider title="지금 뜨는 콘텐츠" />
      </div>
    </main>
  );
}
```

제 프로젝트는
Screen 서버 컴포넌트에서도 data fetching을 하고
Slider 서버 컴포넌트에서도 data fetching을 하고 있습니다.

html을 클라이언트에게 보여주기전에 Screen과 Slider의 data fetching을 완료해야 합니다.

Slider 컴포넌트의 data fetching을 setTimeout으로 5초 지연 시키고 렌더링을 살펴보겠습니다.

```js
// Slider에서 사용하는 axios에 5초 지연
import { Movie } from "../../types/moive";
import { axiosInstance } from "../apiInstance";

export const getMovies = async (category?: string): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axiosInstance.get(
          `/movie/${category ? category : "now_playing"}?language=ko&page=1`
        );
        resolve(response.data.results);
      } catch (error) {
        reject(error);
      }
    }, 5000);
  });
};
```

슬라이더 data fetching 5초 지연
![seo](../img/suspense/5.png)

렌더링 결과
![seo](../img/suspense/1.png)

Screen의 data fetching은 끝났지만 Slider의 data fetching이 끝나지 않아서
Screen에 대한 html을 클라이언트에게 못 보내주는 모습을 확인 할 수 있습니다.

## 4. suspense

이러한 문제를 해결하는 방법으로 suspense가 있습니다

suspense로 감싼 뒤 실행시켜 보겠습니다.

```js
// app/page.tsx
export default function Home() {
  return (
    <main>
      <Suspense>
        <Screen />
      </Suspense>
      <Suspense>
        <div className=" absolute w-full pb-5 top-2/3 sm:top-3/4"></div>
      </Suspense>
    </main>
  );
}
```

슬라이더 data fetching 5초 지연
![seo](../img/suspense/5.png)

![seo](../img/suspense/2.png)

먼저 data fetching이 완료된 Screen의 html을 렌더링 해준 모습을 볼 수 있습니다.
5초뒤에 data fetching이 완료되는 Slider의 data fetching을 기다리지 않는 모습을 볼 수 있습니다.

더 나아가 html의 렌더링이 끝난 Screen은 html과 js로직을 연결(hydration)합니다.

저의 프로젝트로 설명을 해봤는데 저의 프로젝트에 대한 정보가 없어 이해하기 힘들거 같습니다.
[React 18의 새로운 Suspense SSR 아키텍처](https://github.com/reactwg/react-18/discussions/37)을 참고해 주세요.

### 참고자료

- [React 18의 새로운 Suspense SSR 아키텍처](https://github.com/reactwg/react-18/discussions/37)
- [기초부터 배우는 Next YTMusic 클론 코딩 (with next.js 14, UI 마스터)](https://www.inflearn.com/course/%EA%B8%B0%EC%B4%88-next-ytmusic-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9)
