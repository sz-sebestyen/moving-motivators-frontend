import MMBoard from "../MMBoard/MMBoard";
import { useState, useContext } from "react";
import { UserContext } from "../../context";
import { saveDefault } from "../../requests";
import useCards from "../../hooks/useCards";

import Menu from "../UI/Menu";
import Page from "../UI/Page";
import ButtonWithResponse from "../UI/buttons/ButtonWithResponse";

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

  const save = async () => {
    if (saveCards) {
      // console.log("cards to be saved:", saveCards);
      const shouldUpdate = await saveDefault(saveCards);
      // console.log("saveDefaultCards answer:", shouldUpdate);
      if (shouldUpdate) {
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
        >
          Save
        </ButtonWithResponse>
      </Menu>
      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />
    </Page>
  );
};

export default BoardPage;
