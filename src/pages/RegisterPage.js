import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {Button} from "react-bootstrap"
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({});
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({})
  const [errorr, setErrorr] = useState(true)
  const [buttoncon, setButtoncon]=  useState(true)
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  
  let navigate = useNavigate();

  const formValidation = () => {
    const emailError = {};
    const passwordError = {};
    

    let isValid = false;
    let btncon = false;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if(email.trim().length > 4 && email.match(mailformat))
      {
        isValid = false;
        btncon = false;
      }
       
      if(email.trim().length > 4 && !email.match(mailformat)) {
        emailError.emailShort = "Password is not filled in acceptable manner";
        isValid = true;
        btncon = true;
      }
  
      if(password.trim().length > 5 && password.trim().length < 15){
        
        isValid = false;
        btncon = false;
    }

  if(password.trim().length > 0 && password.trim().length <5){
      passwordError.passwordShort = "PAssword must be of 6 characters";
      isValid = true;
      btncon = true;
  }
  if(password.trim().length > 15){
    passwordError.passwordShort = "Password must be in between of 6 - 15 characters";
    isValid = true;
    btncon = true;
}

  setEmailError(emailError);
    setPasswordError(passwordError);
    setButtoncon(btncon);
    setErrorr(isValid)
    return errorr;
  };

  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setLoading(false);
      toast.success("Registration successfull");
      setEmail('')
      setPassword('')
      navigate(`/login`)
    } catch (error) {
      console.log(error);
      toast.error("Please enter valid Credentials for Registration");
      setLoading(false);
    }
  };

  return (
    <div className="register-parent">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_sop8cbmc.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className="col-md-4 z1">
          
          <div className="register-form">
            <h2>Register</h2>

            <hr />
            <form onChange={formValidation}>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError()
              }}
            />
            {Object.keys(emailError).map((key) => {
              return <div style={{ color: "red" }}>{emailError[key]}</div>;
            })}
            <short style={{color: "grey"}}>For eg : jay@gmail.com</short>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError()
              }}
            />
            {Object.keys(passwordError).map((key) => {
              return <div style={{ color: "red" }}>{passwordError[key]}</div>;
            })}
            <short style={{color: "grey"}}>Password must contain atleast 6 letters or numbers</short>
            <br />
            </form>
            <Button variant="success" disabled={buttoncon} className="my-3" onClick={register}>
              REGISTER
            </Button>

            <hr />
            
            <Link  to="/login">Click Here To Login</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
