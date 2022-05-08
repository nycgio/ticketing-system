import { useState } from "react";
import Router from "next/router";

import classes from "./signup.module.scss";
import useRequest from "../../hooks/useRequest";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <div className={classes.formGroup}>
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      {errors}
      <button>Sign Up</button>
    </form>
  );
}

export default signup;
