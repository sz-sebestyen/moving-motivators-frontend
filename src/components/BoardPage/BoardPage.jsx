import MMBoard from "../MMBoard/MMBoard";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/Context";
import { saveDefault } from "../../requests/requests";
import useCards from "../../hooks/useCards";

import "./BoardPage.scss";

import ButtonConfirm from "../styles/buttons/ButtonConfirm";

/**
 * BoardPage component is responsible for rendering a page where the user can
 * arrange and save a default card order, which will be the starter setup
 * under questions.
 *
 * @param {*} props
 */
const BoardPage = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const starterCards = useCards(userContext.user.defaultCardListId);

  const [saveCards, setSaveCards] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    setStatus();
  }, [saveCards]);

  const Save = async () => {
    if (saveCards) {
      setStatus("loading");
      console.log("cards to be saved:", saveCards);
      const data = await saveDefault(saveCards);
      console.log("saveDefaultCards answer:", data);
      if (data) {
        setStatus("done");
        setUserContext((prev) => ({ ...prev, dataLoaded: false }));
      } else {
        setStatus();
      }
    }
  };

  return (
    <main className="boardPage">
      <div className="boardMenu">
        <ButtonConfirm
          title={"Save as default"}
          type="button"
          onClick={Save}
          state={status}
          disabled={status}
        >
          Save
        </ButtonConfirm>
      </div>
      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />
    </main>
  );
};

export default BoardPage;
