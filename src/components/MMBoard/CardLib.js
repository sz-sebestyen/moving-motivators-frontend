import cardIMG0 from "./images/cards/card-acceptance.png";
import cardIMG1 from "./images/cards/card-curiosity.png";
import cardIMG2 from "./images/cards/card-freedom.png";
import cardIMG3 from "./images/cards/card-goal.png";
import cardIMG4 from "./images/cards/card-honor.png";
import cardIMG5 from "./images/cards/card-mastery.png";
import cardIMG6 from "./images/cards/card-order.png";
import cardIMG7 from "./images/cards/card-power.png";
import cardIMG8 from "./images/cards/card-relatedness.png";
import cardIMG9 from "./images/cards/card-status.png";

/**
 * CardLib module is responsible for transforming the card arrangement data
 * from they way it is saved on the server, to the way it is used in MMBoard,
 * and back.
 */

export const cardMap = [
  cardIMG0,
  cardIMG1,
  cardIMG2,
  cardIMG3,
  cardIMG4,
  cardIMG5,
  cardIMG6,
  cardIMG7,
  cardIMG8,
  cardIMG9,
];

export const NUMBER_OF_CARDS = cardMap.length;

export const stringToNumCard = {
  ACCEPTANCE: 0,
  CURIOSITY: 1,
  FREEDOM: 2,
  GOAL: 3,
  HONOR: 4,
  MASTERY: 5,
  ORDER: 6,
  POWER: 7,
  RELATEDNESS: 8,
  STATUS: 9,
};

export const numToStringCard = [
  "ACCEPTANCE",
  "CURIOSITY",
  "FREEDOM",
  "GOAL",
  "HONOR",
  "MASTERY",
  "ORDER",
  "POWER",
  "RELATEDNESS",
  "STATUS",
];

export const stringToNumValue = {
  POSITIVE: 0,
  NEUTRAL: 1,
  NEGATIVE: 2,
};

export const numToStringValue = ["POSITIVE", "NEUTRAL", "NEGATIVE"];
