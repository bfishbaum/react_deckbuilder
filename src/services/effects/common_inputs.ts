import { type GameState, type CardInputType, type AbstractCard, type Card } from "../../types/board";
import { allowEQSelectionsCard } from "./input";
import { makeCard } from "./make_card";
export const scrapCardInput = (state: GameState): CardInputType | undefined => {
	if (state.cardState.hand.length === 0) {
		return undefined;
	}
	return {
		text: "Select a card to scrap.",
		options: [
			...state.cardState.hand,
		],
		selections: state.cardState.hand.map(() => false),
		selectionCriteria: allowEQSelectionsCard(1),
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

export const discardCardInput = (state: GameState): CardInputType | undefined => {
	if (state.cardState.hand.length === 0) {
		return undefined;
	}
	return {
		text: "Select a card to discard.",
		options: [
			...state.cardState.hand,
		],
		selections: state.cardState.hand.map(() => false),
		selectionCriteria: allowEQSelectionsCard(1),
		offerConfirm: (input: CardInputType) => {
			return false;
		},
		outputFunction: (input: CardInputType) => {
			return [
				(state: GameState) => {
					const card = state.cardState.hand.find((card, index) => input.selections[index]);
					if (!card) {
						return state;
					}
					return {
						...state,
						cardState: {
							...state.cardState,
							hand: state.cardState.hand.filter((card, index) => !input.selections[index]),
							discard: [...state.cardState.discard, card]
						}
					}
				}
			]
		},
		cancelText: "Cancel",
		canCancel: false
	}
}

export const copyCardInput = (state: GameState): CardInputType | undefined => {
	if (state.cardState.hand.length === 0) {
		return undefined;
	}
	return {
		text: "Select a card, add a copy to your hand.",
		options: [
			...state.cardState.hand,
		],
		selections: state.cardState.hand.map(() => false),
		selectionCriteria: allowEQSelectionsCard(1),
		offerConfirm: (input: CardInputType) => {
			return false;
		},
		outputFunction: (input: CardInputType) => {
			return [
				(state: GameState) => {
					const card = state.cardState.hand.find((card, index) => input.selections[index]);
					if (!card) {
						return state;
					}
					let newCard: Card = makeCard(card as AbstractCard);
					return {
						...state,
						cardState: {
							...state.cardState,
							hand: [...state.cardState.hand, newCard],
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

