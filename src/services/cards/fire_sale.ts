import { type AbstractCard, type GameState, GOLD_ICON } from "../../types/board";
const fireSaleEffect = (state: GameState): GameState => {
	const handSize = state.cardState.hand.length;
	return {
		...state,
		cardState: {
			...state.cardState,
			hand: [],
			discard: [...state.cardState.discard, ...state.cardState.hand],
		},
		resources: {
			...state.resources,
			gold: state.resources.gold + handSize * 2,
		},
	}
}

export const FireSale: AbstractCard = {
	name: "Fire Sale",
	text: "Discard all cards in hand. Gain 2" + GOLD_ICON + " for each card discarded.",
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [fireSaleEffect],
	tags: ["coin"]
}
