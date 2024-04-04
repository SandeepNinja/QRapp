import styles from "../styles/signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
// import {KRYPTA_KEY} from "../utils"
import {encrypt} from "n-krypta";
import { useToasts } from "react-toast-notifications";
import {fetchResetPasswordThroughEmail} from "../api"
const { useAuth } = require("../hooks");



const Forget = () => {
    const [email, setEmail] = useState("");
    const history = useNavigate();
    const auth = useAuth();
    const { addToast } = useToasts();
    const KRYPTA_KEY = process.env.REACT_APP_KRYPTA_KEY;

  const handleSubmmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetchResetPasswordThroughEmail(email);
      console.log("forget password response::",response.ok)
      
        if(response.data.status){
          addToast(response.data.message , {
            appearance: 'success',
          });
          history("/login");
        }else{
          addToast(response.data.message , {
            appearance: 'error',
          });
        }
    }catch(error){
      console.log("error::", error)
      addToast(error , {
        appearance: 'error',
      });
    }
  }
  
  // if (auth.user) {
  //   return <Navigate to="/" />;
  // }
  return (
    <>
      <div className={styles.backGround}>
        <div className={styles.OuterContainer}>
          <div className={styles.heading}>Forget Password</div>
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

            <button type="submit">Reset</button>
          </form>
          <Link to="/login">
                    <div> click here to login</div>
                </Link>
          <Link to="/signup">
            <div> click here to create account</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Forget;
