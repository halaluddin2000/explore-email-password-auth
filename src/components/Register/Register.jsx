import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const trams = e.target.trams.checked;
    console.log(email, password, trams);

    setErrorMessage("");
    setSuccess(false);
    if (!trams) {
      setErrorMessage(<p>Please Accept Our Trams And Condition</p>);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);

        sendEmailVerification(auth.currentUser).then(() => {
          setSuccess(true);
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="max-w-sm mx-auto mt-12">
      <h2 className="text-4xl font-bold my-4 ">Please Register</h2>
      <form className="space-y-4" onSubmit={handleRegister}>
        {/* Email Filed */}

        <label className="input validator join-item">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            name="email"
            placeholder="mail@site.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>

        <br />
        {/* Password Filed */}
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <div className="relative">
            <input
              type={passwordShow ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
            <div
              onClick={() => {
                setPasswordShow(!passwordShow);
              }}
              className="absolute -mt-4 -right-26"
            >
              {passwordShow ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
        <br />
        <label className="label">
          <input type="checkbox" name="trams" className="checkbox" />
          Accepts Our Trams And Conditions
        </label>
        <br />
        {/* Submit Button  */}
        <input className="btn bg-primary" type="submit" value="submit" />
      </form>
      <p>
        Already have an account? Please{" "}
        <Link className="text-blue-400 underline" to="/login">
          Login
        </Link>{" "}
      </p>
      {errorMessage && <p>{errorMessage}</p>}
      {success && <p>User Created Successfully</p>}
    </div>
  );
}

export default Register;
