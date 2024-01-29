import React from "react";
import styled from "styled-components";
import SvgIcon from "@mui/material/SvgIcon";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { useNavigate } from "react-router-dom";

const Wapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Burger = styled.label`
  @media (min-width: 820px) {
    display: none;
  }
  position: relative;
  width: 30px;
  height: 21px;
  background: transparent;
  cursor: pointer;
  display: block;
  span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }
  span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }
  span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }
  input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }
  input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }
  input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 22px;
    left: 5px;
  }
`;

const BurInput = styled.input`
  display: none;
`;

const BurSpan = styled.span`
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: black;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
`;

const Logo = styled.img`
  @media (max-width: 820px) {
    width: 90px;
    height: 30px;
    margin-top: 0;
  }
  margin-top: 8px;
  width: 120px;
  height: 40px;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  svg {
    @media (max-width: 820px) {
      display: none;
    }
  }
`;

const LoginBtn = styled.button`
  border: 0 solid;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  background-color: #000;
  background-image: none;
  color: #fff;
  cursor: pointer;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 100%;
  font-weight: 900;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
  padding: 0;
  text-transform: uppercase;
  border-radius: 99rem;
  border-width: 2px;
  overflow: hidden;
  padding: 5px 10px;
  position: relative;
  *:disabled {
    cursor: default;
  }
  *:-moz-focusring {
    outline: auto;
  }
  svg {
    display: block;
    vertical-align: middle;
  }
  * [hidden] {
    display: none;
  }
  *::after,
  *::before {
    background: linear-gradient(
      90deg,
      #fff 25%,
      transparent 0,
      transparent 50%,
      #fff 0,
      #fff 75%,
      transparent 0
    );
    content: "";
    inset: 0;
    position: absolute;
    transform: translateY(var(--progress, 100%));
    transition: transform 0.2s ease;
  }
  *::after {
    --progress: -100%;
    background: linear-gradient(
      90deg,
      transparent 0,
      transparent 25%,
      #fff 0,
      #fff 50%,
      transparent 0,
      transparent 75%,
      #fff 0
    );
    z-index: -1;
  }
  *:hover::after,
  *:hover::before {
    --progress: 0;
  }
`;

const Span = styled.span`
  mix-blend-mode: difference;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <Wapper>
      <Burger>
        <BurInput type="checkbox" />
        <BurSpan></BurSpan>
        <BurSpan></BurSpan>
        <BurSpan></BurSpan>
      </Burger>
      <Logo src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="home" />
      <RightBox>
        <SvgIcon component={NightlightIcon} fontSize={"large"} />
        <LoginBtn
          onClick={() => {
            navigate("/login");
          }}
        >
          <Span>Login</Span>
        </LoginBtn>
      </RightBox>
    </Wapper>
  );
}

export default Header;
