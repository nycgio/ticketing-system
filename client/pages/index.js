import buildClient from "../util/buildClient";

const Home = ({ user }) => {
  return <h1>Welcome</h1>;
};

Home.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default Home;
