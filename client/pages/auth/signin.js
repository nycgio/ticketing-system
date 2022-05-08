import { useState } from "react";
import Router from "next/router";

import classes from "./auth.module.scss";
import useRequest from "../../hooks/useRequest";

function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
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
      <button>Sign In</button>
    </form>
  );
}

export default signin;
