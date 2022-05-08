import { useState } from "react";
import classes from "./signup.module.scss";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <div className={classes.formGroup}>
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
        />
      </div>

      <div className={classes.formGroup}>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
        />
      </div>

      <button>Sign Up</button>
    </form>
  );
}

export default signup;
