import React, { useState } from 'react';
import './Login.css';
import UiInputField from '../../components/input/UiInputField';
import UiButton from '../../components/button/UiButton';
import { signin, signup } from "../../data/firebase";
import spinner from '../../assets/spinner.gif';

const stepsLogin = [
  {step: "signIn", title: "Iniciar Sesión"},
  {step: "signUp", title: "Registrate"},
] 
const Login = () => {
  const [stepLogin, setStepLogin] = useState("signIn");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userAuth = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (stepLogin === "signIn") {
      await signin(email, password);
    } else {
      await signup(name, email, password);
    }
    setIsLoading(false);
  }
  
  return (
    isLoading ? <div className="login_spinner">
      <img src={spinner} alt="" />
    </div> :
    <div className="login">
      <div className="login__form">
        <h1>{stepsLogin.find(obj => obj.step === stepLogin).title}</h1>
        <form>
          {stepLogin === "signUp" &&
            <UiInputField type={"text"} placeholder={"Nombre"} value={name} handleChange={(e) => {setName(e.target.value)}}/>
          }
          <UiInputField type={"email"} placeholder={"Email"} value={email} handleChange={(e) => {setEmail(e.target.value)}}/>
          <UiInputField type={"password"} placeholder={"Password"} value={password} handleChange={(e) => {setPassword(e.target.value)}}/>
          <UiButton text={stepsLogin.find(obj => obj.step === stepLogin).title} handleClick={userAuth}/>
        </form>
        <div className="login__form--switch">
          {stepLogin === "signIn" ?
            <p>Nuevo en Streamin App <span onClick={() => {setStepLogin("signUp")}}>Registrate!</span></p> :
            <p>Tengo una cuenta <span onClick={() => {setStepLogin("signIn")}}>Iniciar sesion</span></p>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;