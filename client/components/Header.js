import classes from "./Header.module.scss";
import Link from "next/link";

function Header({ user }) {
  const links = [
    !user && { label: "Sign Up", href: "/auth/signup" },
    !user && { label: "Sign In", href: "/auth/signin" },
    user && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link href="/">
          <a>Home</a>
        </Link>

        <ul>{links}</ul>
      </nav>
    </header>
  );
}

export default Header;
