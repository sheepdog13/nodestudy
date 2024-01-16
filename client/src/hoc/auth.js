import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynsAuth } from "../_reducers/user";
const Auth = (SpecificComponent, option, adminRoute = null) => {
  function AuthenticationCheck() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userAuth = useSelector((state) => state.user.auth.isAuth);

    useEffect(() => {
      dispatch(asynsAuth()).then((response) => {
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) navigate("/");
          }
        }
      });
    }, [userAuth]);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
};
export default Auth;
