import styled from "styled-components";

export const Form = styled.form`
  @media (max-width: 820px) {
    width: 300px;
  }
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 0.4em;
  background-color: #171717;
  border-radius: 25px;
  transition: 0.4s ease-in-out;
`;

export const Title = styled.p`
  text-align: center;
  margin: 2em;
  color: rgb(255, 255, 255);
  font-size: 1.2em;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: white;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
`;

export const IconSvg = styled.svg`
  height: 1.3em;
  width: 1.3em;
  fill: white;
`;
export const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #d3d3d3;
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  gap: 20px;
`;

export const Btn = styled.button`
  padding: 0.8em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #252525;
  color: white;
  *:hover {
    background-color: black;
  }
`;
