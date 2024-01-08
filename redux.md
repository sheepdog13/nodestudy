# Redux 소개

## 01. 리덕스란?

state를 관리해주는 상태관리 라이브러리

### 전역 상태 관리

컴포넌트끼리 똑같은 상태를 공유해야할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태값을 전달하거나 업데이트할 수 있다.

![](https://i.imgur.com/cfYwlpL.png)

### redux data flow

<img width="605" alt="스크린샷 2024-01-08 오후 5 49 08" src="https://github.com/sheepdog13/nodestudy/assets/112137282/2c5670d0-9fae-46b2-913d-a1f26d6aa05a">

redux의 데이터 플로우는 단방향으로만 흐른다.

### 용어 정리

Acticon
무엇이 일어났는지 설명하는 객체

```JS
{type: 'Like_ARTCLE', articleId: 42 }
{type: 'FETCH_USER_SUCCESS', response: { id: 3, name: "Mary"}}
```

Reducer
이전 State와 action object를 받은 후에 next state을 return하는 함수

```js
(previousState, action) => nextState;
```
