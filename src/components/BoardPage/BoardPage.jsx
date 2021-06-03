import MMBoard from "../MMBoard/MMBoard";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/Context";
import { saveDefault } from "../../requests/requests";
import useCards from "../../hooks/useCards";

import Menu from "../styled/Menu";
import Page from "../styled/Page";
import ButtonWithResponse from "../styled/buttons/ButtonWithResponse";

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
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    saveCards && setIsSaved(false);
  }, [saveCards]);

  const save = async () => {
    if (saveCards) {
      // console.log("cards to be saved:", saveCards);
      const shouldUpdate = await saveDefault(saveCards);
      // console.log("saveDefaultCards answer:", shouldUpdate);
      if (shouldUpdate) {
        setIsSaved(true);
        setUserContext((prev) => ({ ...prev, dataLoaded: false }));
      }
    }
  };

  return (
    <Page>
      <Menu>
        <ButtonWithResponse
          variant="confirm"
          title={"Save as default"}
          onClick={save}
          hasSucceeded={isSaved}
        >
          Save
        </ButtonWithResponse>
      </Menu>
      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />
    </Page>
  );
};

export default BoardPage;
