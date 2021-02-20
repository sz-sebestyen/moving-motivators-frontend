import MMBoard from "../MMBoard/MMBoard";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/Context";
import { saveDefault } from "../requests/requests";

import "./BoardPage.scss";

import ButtonConfirm from "../styles/buttons/ButtonConfirm";

import useDefaultCards from "../hooks/useDefaultCards";

/**
 * BoardPage component is responsible for rendering a page where the user can
 * arrange and save a default card order, which will be the starter setup
 * under questions.
 *
 * @param {*} props
 */
const BoardPage = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  // const [starterCards, setStarterCards] = useState();
  const starterCards = useDefaultCards(userContext.user.defaultCardListId);

  const [saveCards, setSaveCards] = useState();

  const [status, setStatus] = useState();

  /**
   * Fetched the previously saved oreder.
   */
  /*   const loadCardList = async () => {
    if (userContext.user.defaultCardListId) {
      const cardList = await getCardList(userContext.user.defaultCardListId);
      console.log("got card list: ", cardList);
      setStarterCards(cardList);
    }
  };
*/
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
