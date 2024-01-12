import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asynsLoginFetch, login } from "../../../_reducers/user";

function LoginPage() {
  const dispatch = useDispatch();
  //  useform hook
  const { register, handleSubmit } = useForm();

  // onsubmit 함수
  const onSubmit = (data) => {
    dispatch(asynsLoginFetch(data));
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
