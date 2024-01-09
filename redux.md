# Redux 설정

## 01. 리덕스를 도와주는 미들웨어

### redux-promise

store는 state를 바꿀때 dispatch를 이용해 action으로 state를 바꾼다.
객체형식인 action이 promise형식으로 왔을때 store에서 promise형식을 받을 수 있게 도와주는 미들웨어

### redux-thunk

객체형식인 action이 function형식으로 왔을때 store에서 function형식을 받을 수 있게 도와주는 미들웨어

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
