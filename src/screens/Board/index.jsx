import MMBoard from "../../components/MMBoard/MMBoard";
import { useState, useContext } from "react";
import { UserContext } from "../../context";
import { saveDefault } from "../../requests";
import useCards from "../../hooks/useCards";

import Navigation from "../../components/Navigation";
import Menu from "../../components/UI/Menu";
import Page from "../../components/UI/Page";
import ButtonWithResponse from "../../components/UI/buttons/ButtonWithResponse";

/**
 * Board screen is responsible for rendering a page where the user can
 * arrange and save a default card order, which will be the starter setup
 * under questions.
 *
 * @param {*} props
 */
const Board = (props) => {
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
    <>
      <Navigation />
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
    </>
  );
};

export default Board;
