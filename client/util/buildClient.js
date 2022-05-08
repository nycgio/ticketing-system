import axios from "axios";

/**
 * The server side render needs to point the nginx namespace because by default
 * it points to its own container which is not accessible by nginx
 */
export default ({ req }) => {
  if (typeof window === "undefined") {
    // server side requests
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // browser requests
    return axios.create({
      baseURL: "/",
    });
  }
};
