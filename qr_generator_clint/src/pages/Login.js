import styles from "../styles/signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
// import {KRYPTA_KEY} from "../utils"
import {encrypt} from "n-krypta";
import { useToasts } from "react-toast-notifications";
const { useAuth } = require("../hooks");


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const auth = useAuth();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const KRYPTA_KEY = process.env.REACT_APP_KRYPTA_KEY;

  const handleSubmmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      // console.log("fill all the fields");
      addToast("fill all the fields", {
        appearance: 'error',
      });
    }
    try{
      // console.log("signindata start");
      const encryptedPassword = encrypt(password, KRYPTA_KEY);
      // console.log("encryptedPassword",encryptedPassword)
      const response = await auth.login(email, encryptedPassword);
      // console.log("login response : ", response);
      if (response.status) {
        // console.log("Account Logined successfully",response);
        addToast("Logined successfully", {
          appearance: 'success',
        });
        history("/");
      } else {
        // console.log("error while login the account :: ", response.message);
        addToast(response.message, {
          appearance: 'error',
        });
      }
    }catch(error){
      addToast(error, {
        appearance: 'error',
      });
    }
   
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.backGround}>
        <div className={styles.OuterContainer}>
          <div className={styles.heading}>Sign In</div>
          <form onSubmit={handleSubmmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputcss}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputcss}
              />
            </div>

            <button type="submit" disabled={loading} >{loading?"Logging...":"Login"}</button>
          </form>
          <Link to="/forget">
            <div> Forget Password</div>
          </Link>
          <Link to="/signup">
            <div> click here to create account</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
