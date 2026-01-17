import { type Card, type AbstractCard, GOLD_ICON } from "../../types/board";
import * as effects from "../effects/effect";
import { v4 as uuid } from 'uuid';
import { setCardInputEffect, allowEQSelectionsCard } from "../effects/input";
import { addResource, drawCards } from "../effects/effect";
import { makeCard } from "../effects/make_card";

export const Fetch: AbstractCard = {
	name: "Fetch",
	text: "Draw 2 cards",
	cost: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 5 },
	effect: [drawCards(2)],
	tags: [""]
}

export const Forage: AbstractCard = {
	name: "Forage",
	text: "Draw 3 cards",
	cost: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 5 },
	effect: [drawCards(3)],
	tags: [""]
}

export const Hoard: AbstractCard = {
	name: "Hoard",
	text: "Draw 4 cards",
	cost: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 7 },
	effect: [drawCards(4)],
	tags: [""]
}
