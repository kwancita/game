import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupForm({ setCurrentUser }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [formData, setFromData] = useState({
    email: "",
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
    fetch("/signup", {
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
          setFromData({ name: "",
            email: "",
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
          <h2 className="h2">Sign up here</h2>
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
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </div>

          <button className="button" type="submit">
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/" className="link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
