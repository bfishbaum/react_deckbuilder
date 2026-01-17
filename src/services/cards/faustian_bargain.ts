
import { type AbstractCard } from "../../types/board";
import * as effects from "../effects/effect";

export const FaustianBargain: AbstractCard = {
	name: "Faustian Bargain",
	text: "Discard 2 random cards. Draw 4.",
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 6 },
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [effects.drawCards(4), effects.discardRandomCard, effects.discardRandomCard],
	tags: []
}