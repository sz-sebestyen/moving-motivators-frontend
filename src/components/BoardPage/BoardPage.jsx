import MMBoard from "../MMBoard/MMBoard";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/Context";
import { getCardList, saveDefault } from "../requests/requests";

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
  const [starterCards, setStarterCards] = useState();
  const [saveCards, setSaveCards] = useState();

  /**
   * Fetched the previously saved oreder.
   */
  const loadCardList = async () => {
    if (userContext.user.defaultCardListId) {
      const cardList = await getCardList(userContext.user.defaultCardListId);
      console.log("got card list: ", cardList);
      setStarterCards(cardList);
    }
  };

  useEffect(() => {
    loadCardList();
  }, [userContext]);

  const Save = async () => {
    if (saveCards) {
      console.log("cards to be saved:", saveCards);
      const data = await saveDefault(saveCards);
      console.log("saveDefaultCards answer:", data);
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    }
  };

  return (
    <main className="boardPage">
      <div className="boardMenu">
        <ButtonConfirm title={"Save as default"} type="button" onClick={Save}>
          Save
        </ButtonConfirm>
      </div>
      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />
    </main>
  );
};

export default BoardPage;
