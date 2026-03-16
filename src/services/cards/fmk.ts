import { type GameState, type Card, type AbstractCard, type CardInputType } from "../../types/board";
import { allowEQSelectionsCard, setCardInputEffect } from "../effects/input";
import { makeCard } from "../effects/make_card";
import { copyCardInput, discardCardInput, scrapCardInput } from "../effects/common_inputs";


export const FMK: AbstractCard = {
	name: "FMK",
	text: "Scrap a card. Discard a card. Add a copy of a card to your hand.",
	price: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [
		(state: GameState) => setCardInputEffect(copyCardInput(state))(state),
		(state: GameState) => setCardInputEffect(discardCardInput(state))(state),
		(state: GameState) => setCardInputEffect(scrapCardInput(state))(state),
	],
	tags: []
}