import { UserContext, removeToken, removeUserId } from "../Context/Context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

export default function Navigation(props) {
  const [userContext, setUserContext] = useContext(UserContext);

  const baseNavLinks = [
    {
      text: "Home",
      props: { to: "/", exact: true },
    },
  ];

  const loggedInNavLinks = [
    {
      text: "Board",
      props: { to: "/board" },
    },
    {
      text: "My groups",
      props: { to: "/groups" },
    },
    {
      text: "Timeline",
      props: { to: "/timeline" },
    },
    {
      text: "Profile",
      props: { to: "/profile" },
    },
    {
      text: "Log out",
      props: {
        to: "/login",
        onClick: (event) => {
          setUserContext((prev) => ({
            ...prev,
            loggedIn: false,
            dataLoaded: false,
          }));
          removeUserId();
          removeToken();
        },
      },
    },
  ];

  const loggedOutNavLinks = [
    {
      text: "Log in",
      props: { to: "/login" },
    },
    {
      text: "Register",
      props: { to: "/register" },
    },
  ];

  const navlinks = [
    ...baseNavLinks,
    ...(userContext.loggedIn ? loggedInNavLinks : loggedOutNavLinks),
  ];

  return (
    <nav>
      <ul>
        {navlinks.map((navlink, index) => {
          return (
            <li key={index}>
              <NavLink {...navlink.props} activeClassName="activeNavLink">
                {navlink.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
