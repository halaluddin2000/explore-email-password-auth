import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { Link } from "react-router";
import { useRef, useState } from "react";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setSuccess(true);
    setErrorMessage("");

    //Login
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (!result.user.emailVerified) {
          alert("Please Email Verified");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  const handleForgetPassword = () => {
    console.log(emailRef.current.value);
    const resetPassword = emailRef.current.value;

    setErrorMessage("");
    //send password reset email
    sendPasswordResetEmail(auth, resetPassword)
      .then(() => {
        alert(
          "A Password reset email is sent. Please Check Your Email Account"
        );
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="card bg-base-50 mx-auto mt-4 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <div>
            <a onClick={handleForgetPassword} className="link link-hover">
              Forgot password?
            </a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p>
          Are You New? Please Registration{" "}
          <Link className="text-blue-500 underline" to="/register">
            Registration
          </Link>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && <p className="text-yellow-400">User Login Successfully</p>}
      </div>
    </div>
  );
}

export default Login;
