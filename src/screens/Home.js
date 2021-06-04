import { useContext } from "react";
import { UserContext } from "../context";
import Navigation from "../components/Navigation";

function Home() {
  const [userContext] = useContext(UserContext);
  return (
    <>
      <Navigation />
      <p>{userContext.loggedIn ? "logged in with:" : "logged out"}</p>
      <p>{userContext.user.name}</p>
    </>
  );
}

export default Home;
