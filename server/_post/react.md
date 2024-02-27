---
date: "2024-02-20"
title: "컨포넌트와 함수의 무거운 연산을 기억해 두는 메모이제이션"
imgpath: "/img/react/cover.jpeg"
---

## 2.5.1 주장1: 섣부른 최적화는 독이다, 꼭 필요한 곳에만 메모이제이션을 추가하자

```js
function sum(a, b) {
  return a + b;
}
```

위와 같이 매우 간단한 연산을 수행하는 함수를 메모이제이션을해 sum(1,1) 결과를 저장해 두고 sum(1,1)이 다시 실행될때 메모리에서 그 값을 꺼내오는게 나을까? 아니면 단순히 자바스크립트에 1+1을 실행시키는 게 나을까?

이관점을 리액트에서 생각해보자.

메모이제이션에도 비용이 드는데 두가지 비용이든다.

1. 값을 비교하고 렌더링 또는 재계산이 필요한지 확인하는 작업
2. 이전에 결과물을 저장해 두었다가 다시 꺼내오는 작업

위같은 비용이 들기 때문에 메모이제이션으로 인한 성능 개선이 렌더링보다 낫지 않다면 결국 안하느니만 못하는 상황을 마주하게 된다.
일단 애플리케이션을 어느 정도 만든 이후에 개발자 도구나 useEffect를 사용해 실제로 어떻게 렌더링이 일어나고 있는지 확인하고 필요한 곳에서만 최적화 하는것이 옳다.

## 주장 2: 렌더링 과정의 비용은 비싸다, 모조리 메모이제이션해 버리자

만약 리액트 애플리케이션의 구모가 커지고, 개발자는 많아지고, 컴포넌트의 복잡성이 증가하는 상황에서도 주장1의 기조를 유지할 수 있을까?

실무에 임하는 모든 개발자들은 생각보다 최적화나 성능 향상에 쏟을 시간이 많지 않다는 사실에 모두 공감할 것이다.

일단 memo로 감싼 뒤에 생각해 보는 건 어떨까? 이때 발생하는 렌더링 비용이 저렴하거나 사실 별로 렌더링이 안 되는 컴포넌트에 memo를 썼을때 역으로 지불해야 하는 비용을 생각해보자.

1. 항상 얕은비교로 props의 값이 다른지 확인해야한다.
2. cpu와 메모리를 사용해 이전 렌더링 결과물을 저장해야한다.

2번의 경우는 기본적인 리액트의 재조정 알고리즘이기 때문에 어자피 리액트의 기본적인 알고리즘 때문에 이전 결과물은 어떻게든 저장해 두고 있다.

따라서 우리가 memo로 지불해야 하는 비용은 props에 대한 얕은 비교뿐이다.

반면에 memo를 하지 않았을 때 발생할 수 있는 문제는 다음과 같다.

- 렌더링을 함으로써 발생하는 비용
- 컴포넌트 내부의 복잡한 로직의 재실행
- 그리고 위 두가지 모두가 모든 자식 컴포넌트에서 반복해서 일어남
- 리액트가 구 트리와 신규 트리를 비교

얼핏 살펴보더라도 memo를 하지 않았을 때 치러할 잠재적인 위험 비용이 더 크다는 사실을 알 수 있다.

useMemo와 useCallback을 살펴보자.

리렌더링이 발생할 때 메모이제이션과 같은 별도 조치가 없다면 모든 객체는 재생성되고, 결과적으로 참조는 달라지게 된다. 이 달라진 참조에 대한 값을 어디서든 쓰지 않는다면 큰 문제가 되지 않을 수 있지만 이 값이 useEffect와 같은 의존성 배열에 쓰이면 어떻게 될까?

```js
function useMath(number) {
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);

  useEffect(() => {
    setDouble(number * 2);
    setTriple(number * 3);
  }, [number]);

  return { double, triple };
}

function App() {
  const [counter, setCounter] = useState(0);
  const value = useMath(10);

  useEffect(() => {
    console.log(value.double, value.triple);
  }, [value]);

  function handleClick() {
    setCounter((prev) => prev + 1);
  }
  return (
    <>
      <h1>{counter}</h1>
      <button onClick={handleClick}>+</button>
    </>
  );
}

export default App;
```

useMath의 인수값이 변하지 않는 이상 같은 값을 가지고 있어야 하는데 콘솔이 출력되는 것을 볼 수 있다.

함수형 컴포넌트인 app이 호출되면서 useMath가 계속해서 호출되고, 객체 내부의 값 같지만 참조가 변경되기 때문이다.

```js
function useMath(number) {
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);

  useEffect(() => {
    setDouble(number * 2);
    setTriple(number * 3);
  }, [number]);

  return useMemo(() => ({ double, triple }), [double, triple]);
}
```

useMath의 반환값을 useMemo로 감싼다면 값이 변경되지 않는 한 같은 결과물을 가질 수 있고, 그 덕분에 사용하는 쪽에서도 참조의 투명성을 유지할 수 있게 된다.
출처 김용찬 ⌜모던 리액트 Deep Dive⌟

![대체텍스트](../img/react/cover.jpeg)
