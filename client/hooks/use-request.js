import axios from "axios";
import { useState } from "react";

import classes from "./hooks.module.scss";

function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      return response.data;
    } catch (error) {
      setErrors(
        <div className={classes.error}>
          <h4>Ooops...</h4>
          <ul>
            {error.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
}

export default useRequest;
