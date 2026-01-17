import { type AbstractCard, type GameState, GOLD_ICON } from "../../types/board";
import { makeCard } from "../effects/make_card";

const midasTouchEffect = (state: GameState): GameState => {
	return {
		...state,
		cardState: {
			...state.cardState,
			discard: [...state.cardState.discard, makeCard(MidasTouch), makeCard(MidasTouch)],
		},
		resources: {
			...state.resources,
			gold: state.resources.gold + 4,
		},
	}
}

export const MidasTouch: AbstractCard = {
	name: "Midas Touch",
	text: "Add 4 " + GOLD_ICON + ". Add 2 copies of this card to your discard pile.",
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 2 },
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [midasTouchEffect],
	tags: []
}