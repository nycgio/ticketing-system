import buildClient from "../util/buildClient";
import classes from "../styles/Home.module.scss";

const Home = ({ user }) => {
  return (
    <div className={classes.container}>
      {user ? <h1>You are signed in</h1> : <h1>You are signed out!</h1>}
    </div>
  );
};

Home.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default Home;
