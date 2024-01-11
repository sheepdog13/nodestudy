import { useForm } from "react-hook-form";
import axios from "axios";

function RegisterPage() {
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
        <input
          placeholder="password_confirm"
          type="password_confirm"
          {...register("password_confirm", { required: true })}
        ></input>
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default RegisterPage;
