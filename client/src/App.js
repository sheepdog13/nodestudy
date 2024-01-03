import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";

// git commit 템플릿 설정
function App() {
  //  useform hook
  const { register, handleSubmit } = useForm();

  // post 요청 함수
  async function login(data) {
    try {
      //응답 성공
      const response = await axios.post("/api/auth/login", data);
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  // onsubmit 함수
  const onSubmit = (data) => {
    const user = { ...data };
    console.log(user);
    login(user);
  };

  // get 요청 로그인후에 받아올수 있게 만들기
  // const { data } = useQuery(
  //   "health",
  //   async () => {
  //     const response = await fetch(`/api/health`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     console.log("healthdata", data);
  //     return data;
  //   },
  //   {
  //     retry: 0,
  //   }
  // );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="id"
          {...register("username", { required: true })}
        ></input>
        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        ></input>
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default App;
