import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asynsLoginFetch, login } from "../../../_reducers/user";
import { useEffect } from "react";

function LoginPage() {
  // redux user 가져오기
  const user = useSelector((state) => state.user.value);
  // useNavigate
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user.loginSuccess) {
      navigate("/");
    }
  }, [user]);
  //  useform hook
  const { register, handleSubmit } = useForm();
  // redux dispatch함수 가져오기
  const dispatch = useDispatch();

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
