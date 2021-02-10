import cardIMG0 from "../../images/card-acceptance.png";
import cardIMG1 from "../../images/card-curiosity.png";
import cardIMG2 from "../../images/card-freedom.png";
import cardIMG3 from "../../images/card-goal.png";
import cardIMG4 from "../../images/card-honor.png";
import cardIMG5 from "../../images/card-mastery.png";
import cardIMG6 from "../../images/card-order.png";
import cardIMG7 from "../../images/card-power.png";
import cardIMG8 from "../../images/card-relatedness.png";
import cardIMG9 from "../../images/card-status.png";

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
