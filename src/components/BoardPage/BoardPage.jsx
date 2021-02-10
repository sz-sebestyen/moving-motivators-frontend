import MMBoard from "../MMBoard/MMBoard";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/Context";
import { getCardList, saveDefault } from "../requests/requests";

const BoardPage = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [starterCards, setStarterCards] = useState();
  const [saveCards, setSaveCards] = useState();

  const loadCardList = async () => {
    if (userContext.user.defaultCardListId) {
      const cardList = await getCardList(userContext.user.defaultCardListId);
      console.log("got card list: ", cardList);

      // TODO: set starterCards
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
    }
  };

  return (
    <main className="boardPage">
      <div className="boardMenu">
        <button type="button" onClick={Save}>
          Save as default
        </button>
      </div>
      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />
    </main>
  );
};

export default BoardPage;