import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { useState, useEffect } from "react";
import { Signup, Login, StaticQR } from "../pages";
import { useAuth } from "../hooks";
import Logo from "../Images/Logo.png"

const NavBar = (req, res) => {
  const [toggle, setToggle] = useState(false);
  const auth = useAuth();
  // console.log("navbar auth:: ", auth);
  function onClickMenuBar() {
    setToggle((prevToggl) => !prevToggl);
    // console.log("toggle: ", toggle);
    const element = document.getElementById("MenuBar");
    const displayStyle = window
      .getComputedStyle(element)
      .getPropertyValue("display");
    // console.log("Display style:", displayStyle);
    if (displayStyle === "block") {
      // console.log("block hai");
    } else {
      // console.log("none");
    }
  }
  // console.log("toogle2: ", toggle);

  return (
    <>
      <div className={styles.navOuter}>
        <div className={styles.logoName}>
          <Link to="/">
            <img
              alt="Logo"
              width="50px"
              height="50px"
              src={Logo}
              // style={{
              //   backgroundColor: "red",
              //   borderRadius: "50%",
              //   display: "block",
              // }}
            />
          </Link>
          <div className={styles.CompanyName}>Vishwakarma Solutions</div>
        </div>
        <div className={styles.navRightContainer}>
          <div
            className={`${styles.navRightContentToggle} ${
              toggle ? styles.navRightContentToggleActive : ""
            }`}
          >
            <ul className={`${toggle ? styles.navDropDownActive : ""}`}>
              <Link to="/" className={styles.link}>
                <li>Home</li>
              </Link>
              <Link to="/dynamicqr" className={styles.link}>
                <li>Dynamic QR</li>
              </Link>
              {auth.user ? (
                <li>
                  {/* {console.log("logout::", auth.user)} */}
                  <Link to="/" className={styles.link} onClick={auth.logout}>
                    logout
                  </Link>
                </li>
              ) : (
                <li>
                  {/* {console.log("login::", auth.user)} */}
                  <Link className={styles.link} to="/login">login</Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            {auth.user?(
            <Link to={`/dynamicqr/${auth.user.id?auth.user.id:auth.user._id}`}><img src={auth.user.avatar} style={{height:"50px",width:"50px",backgroundColor:"yellow",borderRadius:"50%"}}/></Link>
            ):(<></>)}
          </div>
          <div
            className={styles.MenuToogle}
            id="MenuBar"
            onClick={onClickMenuBar}
          >
            <div
              className={`${styles.menuTopBar} ${styles.bar} ${
                toggle ? styles.menuTopBarActive : ""
              }`}
            ></div>
            <div
              className={`${styles.menuMiddleBar} ${styles.bar} ${
                toggle ? styles.menuMiddleBarActive : ""
              }`}
            ></div>
            <div
              className={`${styles.menuBottomBar} ${styles.bar} ${
                toggle ? styles.menuBottomBarActive : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
