import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./login.module.css";
import LoginImg from "../../image/login_image.png";
import { SiRiotgames } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

const Login = ({ authService }) => {
  const history = useHistory();
  const gotoMaker = (userId) => {
    history.push({
      pathname: "/card",
      state: { id: userId },
    });
  };

  const onLogin = (event) => {
    authService
      .login(event.currentTarget.textContent) //
      .then((data) => gotoMaker(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && gotoMaker(user.uid);
    });
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onMemberLogin = async (e) => {
    e.preventDefault();
    authService
      .signIn(email, password) //
      .then(console.log);
  };

  const handleChange = (e) => {
    const type = e.target.name;
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onMemberLogin();
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.login_container}>
        <div className={styles.login_wrap}>
          <h1 className={styles.title}>LOGIN</h1>
          <form
            className={styles.form}
            onSubmit={onMemberLogin}
            onKeyPress={handleKeyPress}
          >
            <div className={styles.email}>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                name="email"
                value={email}
                onChange={handleChange}
                className={styles.input_email}
              />
            </div>
            <div className={styles.password}>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="password"
                value={password}
                onChange={handleChange}
                className={styles.input_password}
                autocomplete="off"
              />
            </div>
            <button className={styles.BtnLogin} type="submit">
              <SiRiotgames />
            </button>
          </form>
          <p className={styles.signup_link}>
            회원이 아니신가요? <Link to="/signup">회원가입</Link>
          </p>
          <div className={styles.social_login}>
            <button
              type="button"
              className={styles.BtnGoogleLogin}
              onClick={onLogin}
            >
              <FcGoogle className={styles.icon_google} />
              Google
            </button>
            <button
              type="button"
              className={styles.BtnGithubLogin}
              onClick={onLogin}
            >
              <SiGithub className={styles.icon_github} />
              Github
            </button>
          </div>
        </div>
        <div className={styles.login_image_container}>
          <img src={LoginImg} alt="Login_image" className={styles.login_img} />
        </div>
      </div>
    </div>
  );
};

export default Login;
