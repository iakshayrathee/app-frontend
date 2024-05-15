import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleButton from "react-google-button";
import "./Login.css";

const Signup = () => {
  const [username, setUsername] = useState(" ");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const { googleSignIn } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      const user = {
        username: username,
        name: name,
        email: email,
      };

      fetch("https://app-backend-7r7g.onrender.com/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            console.log(data);
            navigate("/");
          }
        });
    } catch (err) {
      setError(err.message);
      window.alert(err.message);
    }
  };
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img className="image" src={twitterimg} alt="twitterImage" />
        </div>

        <div className="form-container">
          <div className="">
            <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />

            <h2 className="heading">Happening now</h2>

            <div class="d-flex align-items-sm-center">
              <h3 className="heading1"> Join twitter today </h3>
            </div>

            {error && <p className="errorMessage">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                className="display-name"
                style={{ backgroudColor: "red" }}
                type="username"
                placeholder="@username "
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                className="display-name"
                style={{ backgroudColor: "red" }}
                type="name"
                placeholder="Enter Full Name"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="email"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <ReCAPTCHA
                sitekey="6LcuqL0pAAAAACx37WNiFrMLSFuYZzHfQSTZ3keL"
                style={{ padding: "6px 0" }}
                onChange={onChange}
              />

              <div>
                <div className="btn-login">
                  <button type="submit" className="btn">
                    SignUp
                  </button>
                </div>
                <h4 className="or" style={{ marginLeft: "8rem" }}>
                  OR
                </h4>
                <div>
                  <GoogleButton
                    className="g-btn"
                    type="light"
                    onClick={handleGoogleSignIn}
                  />
                </div>
              </div>

              <p style={{ padding: "3px 0", color: "red" }}>
                Please verify ReCAPTCHA to signup
              </p>
            </form>

            <div>
              Already have an account?
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "var(--twitter-color)",
                  fontWeight: "600",
                  marginLeft: "5px",
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
