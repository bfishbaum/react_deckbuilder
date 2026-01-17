import type { AbstractCard } from "../types/board";
import * as cards from "./card_index";

// List of all imported cards
export const cardList: AbstractCard[] = Object.values(cards);