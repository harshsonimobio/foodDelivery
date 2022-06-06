import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
function Forget() {
    const [forgetEmail, setForgetEmail] = useState("");
    const [loading, setLoading] = useState(false);
  const auth = getAuth();

const forgett = () => {
    try {
      const result = sendPasswordResetEmail(
        auth,
        forgetEmail,
      );
      console.log(result)
      setLoading(false);
      toast.success("Link sent to your Email-Id");
     
    } catch (error) {
      console.log(error);
      toast.error("The user is not registered");
    }
  };
  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Forget Password</h2>

            <hr />

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={forgetEmail}
              onChange={(e) => {
                setForgetEmail(e.target.value);
              }}
            />
            <button className="my-3" onClick={forgett}>Forget password</button>
            <hr />

            <Link to='/register'>Click Here To Register</Link><br />
            <Link to="/login">Click Here To Login</Link>
          </div>
        </div>
        
      </div>
    </div>
  );

            }
export default Forget;
