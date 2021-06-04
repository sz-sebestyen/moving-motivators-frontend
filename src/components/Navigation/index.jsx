import { UserContext, removeToken, removeUserId } from "../../context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
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
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12);

  ul {
    list-style: none;
    display: flex;

    li {
      &:nth-last-child(2) {
        margin-left: auto;
      }
    }
  }
`;

const activeClassName = "activeNavLink";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  display: inline-block;
  text-decoration: none;
  color: inherit;
  padding: 8px 10px;

  &.${activeClassName} {
    color: red;
  }

  &:hover {
    background-color: #eee;
  }

  &:active {
    background-color: #aaa;
  }
`;
