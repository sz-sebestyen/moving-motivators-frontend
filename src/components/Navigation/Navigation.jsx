import { UserContext, removeToken, removeUserId } from "../Context/Context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import "./Navigation.scss";
import styled from "styled-components";

/**
 * Navigation component is responsible for rendering the links that
 * point to the pages.
 *
 * @param {*} props
 */

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
    <Nav>
      <ul>
        {navlinks.map((navlink, index) => {
          return (
            <li key={index}>
              <StyledLink {...navlink.props}>{navlink.text}</StyledLink>
            </li>
          );
        })}
      </ul>
    </Nav>
  );
}

const Nav = styled.nav`
  border-bottom: 1px solid black;

  ul {
    list-style: none;
    display: flex;

    li {
      display: inline;

      &:last-child {
        margin-left: auto;
      }

      a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: inherit;
      }

      a:hover {
        background-color: #eee;
      }

      a:active {
        background-color: #333;
      }
    }
  }
`;

const activeClassName = "activeNavLink";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: red;
  }
`;
