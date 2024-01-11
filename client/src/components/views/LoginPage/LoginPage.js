import { useForm } from "react-hook-form";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";

function LoginPage() {
  const dispatch = useDispatch();
  //  useform hook
  const { register, handleSubmit } = useForm();

  // post 요청 함수
  // async function login(data) {
  //   try {
  //     //응답 성공
  //     const response = await axios.post("/api/users/login", data);
  //     console.log(response);
  //   } catch (error) {
  //     //응답 실패
  //     console.error(error);
  //   }
  // }

  // onsubmit 함수
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="id"
          {...register("email", { required: true })}
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

export default LoginPage;
