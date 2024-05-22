import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { checkValidity } from "../Utilities/validation";
import { texts } from "../Utilities/helper";
import { useNavigate } from "react-router-dom";

export function Form() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const userName = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    id: "",
  });

  useEffect(() => {
    if (userInfo.username && userInfo.email && userInfo.password) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = email.current ? email.current.value : '';
    const passwordValue = password.current ? password.current.value : '';
    const errorMessage = checkValidity(emailValue, passwordValue);
    
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }
    
    const id = texts(6);
  
    setUserInfo({
      username: userName.current.value,
      email: emailValue,
      password: passwordValue,
      id: id,
    });
  
    setErrorMessage("");
  
    if (login) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      console.log("User info saved to local storage:", userInfo);
    }
  
    if (userName.current) userName.current.value = "";
    if (password.current) password.current.value = "";
    if (email.current) email.current.value = "";
  
    setTimeout(() => {
      navigate("/main");
    }, 1000);
  
    if (!login) {
      const userInfoString = localStorage.getItem("userInfo");
      const users = JSON.parse(userInfoString) || [];
      const foundUser = users.find(
        (user) =>
          user.username === userName.current.value &&
          user.password === passwordValue
      );
  
      if (foundUser) {
        navigate("/main");
      } else {
        setErrorMessage("Invalid username or password");
      }
    }
  };
  

  return (
    <div className="bg-gray-300 h-min py-10 md:w-96 rounded-xl overflow-x-hidden w-10/12">
      <h1 className="text-center text-2xl font-bold my-2">Weather App</h1>
      <h1 className="text-center text-lg font-semibold text-black my-2">
        {login ? "Welcome Back!" : "Create an account"}
      </h1>
      <form
        className="flex flex-col items-center gap-5 overflow-x-hidden"
        onSubmit={handleSubmit}
      >
        <input
          ref={userName}
          type="text"
          placeholder="Username"
          className=" w-9/12 border-2 border-zinc-950 rounded-md h-10 px-3"
          maxLength={10}
        />
        {!login && (
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="w-9/12 border-2 border-zinc-950 rounded-md h-10 px-3"
          />
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-9/12 border-2 border-zinc-950 rounded-md h-10 px-3 maxLength={10}"
        />

        <Button btnName={login ? "Login" : "sign up"} />

        <div className="flex">
          <span className=" cursor-pointer font-medium mx-3  text-black">
            {login ? "Create New user ?" : "Already user ?"}
          </span>
          <p
            onClick={() => {
              setLogin(!login);
            }}
            className=" cursor-pointer hover:underline"
          >
            {!login ? "Login" : "sign up"}
          </p>
        </div>

        <p className="text-red-500">{errorMessage}</p>
      </form>
    </div>
  );
}
