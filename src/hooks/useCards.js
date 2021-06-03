import { useState, useEffect } from "react";
import { getCardList } from "../requests/requests";

const useCards = (cardListId) => {
  const [defaultCards, setDefaultCards] = useState();

  /**
   * Fetch the previously saved oreder.
   */
  const loadCardList = async () => {
    if (cardListId) {
      const cardList = await getCardList(cardListId);
      console.log("got card list: ", cardList);
      setDefaultCards(cardList);
    }
  };

  useEffect(() => {
    loadCardList();
  }, [cardListId]); // eslint-disable-line

  return defaultCards;
};

export default useCards;
