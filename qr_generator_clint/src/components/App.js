import React from "react";
import { useAuth } from "../hooks";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {NavBar, ExternalDirectory} from "./";
import {Login, Signup, Forget, StaticQR, DynamicQR, UserProfile} from "../pages";
import styles from "../styles/app.module.css"
function PrivateRoute({ auth, children }) {
  if (auth.user) {
    // console.log("priviteRoute auth user:: ", auth.user);
    return children;

  }
  return <Navigate to="/login" />;
}

const App = () => {
  const auth = useAuth(); // Assuming this hook is correctly implemented

  return (
    <div className={styles.pageBackground}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<StaticQR />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forget" element={<Forget />} />
          <Route
          exact
          path="/dynamicqr"
          element={
            <PrivateRoute auth={auth}>
              <DynamicQR />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/dynamicqr/:userId"
          element={
            <PrivateRoute auth={auth}>
              <UserProfile />
            </PrivateRoute>
          }
        />
          <Route exact path="/dynamicqr/directorydetails/:dictoryId" element={<ExternalDirectory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
