import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { asynsRegisterFetch } from "../../../_reducers/user";
import Auth from "../../../hoc/auth";
import styled from "styled-components";
import * as common from "../../../styles/LoginRegister";

const Wapper = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
    <Wapper>
      <common.Form onSubmit={handleSubmit(onSubmit)}>
        <common.Title>Sign Up</common.Title>
        <common.InputBox>
          <common.IconSvg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </common.IconSvg>
          <common.Input
            placeholder="email"
            {...register("email", { required: true })}
          />
        </common.InputBox>
        <common.InputBox>
          <common.IconSvg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 384 512"
          >
            <path
              fill="#ffffff"
              d="M256 48V64c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H256zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM160 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
            />
          </common.IconSvg>
          <common.Input
            placeholder="name"
            {...register("name", { required: true })}
          />
        </common.InputBox>
        <common.InputBox>
          <common.IconSvg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </common.IconSvg>
          <common.Input
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
        </common.InputBox>
        <common.InputBox>
          <common.IconSvg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </common.IconSvg>
          <common.Input
            placeholder="password_confirm"
            type="password"
            {...register("password_confirm", { required: true })}
          />
        </common.InputBox>
        <common.BtnBox>
          <common.Btn type="submit">Sign Up</common.Btn>
          <common.Btn
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </common.Btn>
        </common.BtnBox>
      </common.Form>
    </Wapper>
  );
}

export default Auth(RegisterPage, false);
