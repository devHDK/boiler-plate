import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_action/user_action";

function RegisterPage() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (evnet) => {
    evnet.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 다릅니다.");
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((Response) => {
      if (Response.payload.success) {
        navigate("/Login");
        alert("회원가입 완료");
      } else {
        alert("회원가입 실패");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email </label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>

        <label>Name </label>
        <input type="text" value={Name} onChange={onNameHandler}></input>
        <label>password </label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>
        <label>Confirm password </label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        ></input>
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
