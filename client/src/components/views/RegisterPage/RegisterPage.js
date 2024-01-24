import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { asynsRegisterFetch } from "../../../_reducers/user";
import Auth from "../../../hoc/auth";
function RegisterPage() {
  // redux user 가져오기
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.success) {
      navigate("/login");
    }
  }, [navigate, user]);
  //  useform hook
  const { register, handleSubmit } = useForm();

  // onsubmit 함수
  const onSubmit = (data) => {
    if (data.password !== data.password_confirm) {
      alert("비밀번호가 서로 맞지 않습니다");
    } else {
      const body = {
        email: data.email,
        name: data.name,
        password: data.password,
      };
      dispatch(asynsRegisterFetch(body));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="email"
          {...register("email", { required: true })}
        ></input>
        <input
          placeholder="name"
          {...register("name", { required: true })}
        ></input>
        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        ></input>
        <input
          placeholder="password_confirm"
          type="password"
          {...register("password_confirm", { required: true })}
        ></input>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}

export default Auth(RegisterPage, false);
