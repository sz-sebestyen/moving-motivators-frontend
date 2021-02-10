import { UserContext, removeToken, removeUserId } from "../Context/Context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

export default function Navigation(props) {
  const [userContext, setUserContext] = useContext(UserContext);

  const navlinks = [
    {
      text: "Home",
      props: { to: "/", exact: true },
    },
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
    ...[
      userContext.loggedIn
        ? {
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
          }
        : {
            text: "Log in",
            props: { to: "/login" },
          },
    ],
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
