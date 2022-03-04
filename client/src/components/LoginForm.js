
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ setCurrentUser }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [formData, setFromData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userData = { ...formData };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          navigate("/games");
          setFromData({
            username: "",
            password: "",
          });
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  
  return (
    <div className="container">
      <form className="form-div" onSubmit={handleSubmit}>
        <div>
          <Link to="/">
            <button className="right">X</button>
          </Link>
        </div>
        <div className="form">
          <h2 className="h2">Login Here</h2>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <div className="error">
            <span>{errors}</span>
          </div>
          <br />
          <button className="button" type="submit">
            Login
          </button>
          <p>
            No account yet?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

