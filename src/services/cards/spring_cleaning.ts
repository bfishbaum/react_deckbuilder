import { type GameState, type AbstractCard, type CardInputType } from "../../types/board";
import { allowAnySelectionsCard, setCardInputEffect } from "../effects/input";

const input = (state: GameState): CardInputType => {
	return {
		text: "Select any number of cards to remove",
		options: [
			...state.cardState.hand,
		],
		selections: state.cardState.hand.map(() => false),
		selectionCriteria: allowAnySelectionsCard,
		offerConfirm: (input: CardInputType) => {
			return false;
		},
		outputFunction: (input: CardInputType) => {
			return [
				(state: GameState) => {
					return {
						...state,
						cardState: {
							...state.cardState,
							hand: state.cardState.hand.filter((card, index) => !input.selections[index]),
							discard: [...state.cardState.discard]
						}
					}
				}
			]
		},
		cancelText: "Cancel",
		canCancel: false
	}
}

export const SpringCleaning: AbstractCard = {
	name: "Spring Cleaning",
	text: "Remove selected cards from your deck",
	price: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [(state: GameState) => setCardInputEffect(input(state))(state)],
	tags: []
}