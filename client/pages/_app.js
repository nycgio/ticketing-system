import Header from "../components/Header";
import "../styles/globals.scss";
import buildClient from "../util/buildClient";
function MyApp({ Component, pageProps, user }) {
  return (
    <>
      <Header user={user} />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  const client = buildClient(context.ctx);
  let pageProps = {};

  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }

  const { data } = await client.get("/api/users/currentuser");

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
