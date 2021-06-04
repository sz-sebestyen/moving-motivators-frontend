import { useContext } from "react";
import { UserContext } from "../context";

function Home() {
  const [userContext] = useContext(UserContext);
  return (
    <>
      <p>{userContext.loggedIn ? "logged in with:" : "logged out"}</p>
      <p>{userContext.user.name}</p>
    </>
  );
}

export default Home;
