import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import AuthContext from "../context/AuthProvider";

export function Login({ setLoggedInUser }) {
  // const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*use axios here to implement login*/
    try {
      const res = await axios.post(
        "http://localhost:8088/login",
        JSON.stringify({
          username: user,
          password: pwd,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentails: true,
        }
      );
      console.log(res);
      setLoggedInUser(res.data.accessToken);
      navigate("/");
      // setAuth({ user, pwd, roles, accessToken });
      // setSuccess(true);
    } catch (err) {
      console.log(err);
      setErrMsg(err?.response?.data?.msg);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1> <br />
          <p>
            <a href="'#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an account? <br />
            <span className="line">
              <Link to="/">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}
