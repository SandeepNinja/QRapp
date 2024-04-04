import React, { useState, useEffect } from "react";
import { Link,useNavigate, Navigate  } from "react-router-dom";
import { signup, generateOTP } from "../api";
import { useToasts } from "react-toast-notifications";
import styles from "../styles/signup.module.css";
const { encrypt } = require("n-krypta");
// const { KRYPTA_KEY } = require("../utils");

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const { addToast } = useToasts();
    const KRYPTA_KEY = process.env.REACT_APP_KRYPTA_KEY;
    const history = useNavigate();

    useEffect(() => {
        let timerInterval;
        if (secondsRemaining > 0) {
            timerInterval = setInterval(() => {
                setSecondsRemaining(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [secondsRemaining]);

    const handleSubmmit = async (e) => {
        e.preventDefault();
        console.log("handle submit");
        if (!name || !email || !password || !confirmPassword || !otp) {
            addToast("Fill all the fields", { appearance: 'error' });
            return;
        } else if (password !== confirmPassword) {
            addToast("Passwords don't match", { appearance: 'error' });
            return;
        }

        try {
            if (typeof password !== 'string' || !password.trim()) {
                throw new Error("Invalid password");
            }
            // Check if KRYPTA_KEY is not undefined and is a string
            if (typeof KRYPTA_KEY !== 'string' || !KRYPTA_KEY.trim()) {
                throw new Error("Invalid encryption key");
            }
            const encryptedPassword = encrypt(password.trim(), KRYPTA_KEY.trim());
            const response = await signup(name, email, encryptedPassword, otp);
            if (response.data.status) {
                addToast(response.data.message, { appearance: 'success' });
                // Redirect to login page
                history("/login");
            } else {
                addToast(response.data.message, { appearance: 'error' });
            }
        } catch (error) {
            console.log("Error:",error)
            addToast(error.message, { appearance: 'error' });
        }
    };

    const sendOTP = async (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        setSecondsRemaining(60);

        try {
            await generateOTP(email);
            addToast(`OTP sent to email id ${email}`, { appearance: 'success' });
        } catch (error) {
            addToast(error.message, { appearance: 'error' });
        }
    };

    return (
        <div className={styles.backGround}>
            <div className={styles.OuterContainer}>
                <div className={styles.heading}>Sign Up</div>
                <form onSubmit={handleSubmmit}>
                    {/* Form fields */}
                    <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.inputcss}
                            />
                        </div>
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
                        <div>
                            <label style={{ textAlign: "left" }}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.inputcss}
                            />
                        </div>
                        <div style={{ flexDirection: "column" }}>
                                <div>
                                    <input type="text" onChange={(e) => { setOtp(e.target.value) }} placeholder="Enter OTP here.."  className={styles.inputcss}/>
                                    <button disabled={buttonDisabled} onClick={sendOTP}>Get OTP</button>
                                    <div>{secondsRemaining > 0 && `OTP button will be enabled in ${secondsRemaining} seconds`}</div>
                                 </div>
                        </div>

                    {/* Submit button */}
                    <button type="submit">Submit</button>
                </form>
                {/* Link to login */}
                <Link to="/login">
                    <div> click here to login</div>
                </Link>
            </div>
        </div>
    );
};

export default Signup;
