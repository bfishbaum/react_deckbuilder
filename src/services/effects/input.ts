import { type GameState, type AbstractCard, type InputType, type CardInputType } from "../../types/board";
import { makeCard } from "./make_card";

export const allowAnySelections = (input: InputType) => {
	return true;
}

export const allowAnySelectionsCard = (input: CardInputType) => {
	return true;
}

export const allowLTESelections = (k: number) => (input: InputType) => {
	return input.selections.filter((e) => e).length <= k;
}

export const allowLTESelectionsCard = (k: number) => (input: CardInputType) => {
	return input.selections.filter((e) => e).length <= k;
}

export const allowEQSelections = (k: number) => (input: InputType) => {
	return input.selections.filter((e) => e).length === k;
}

export const allowEQSelectionsCard = (k: number) => (input: CardInputType) => {
	return input.selections.filter((e) => e).length === k;
}

export const setInputEffect = (input: InputType) => (state: GameState) => {
	return {
		...state,
		input: Object.assign({}, input),
	};
}

export const setCardInputEffect = (input: CardInputType | undefined) => (state: GameState) => {
	return {
		...state,
		cardInput: input ? Object.assign({}, input) : undefined
	};
}

export const setCardInputEffectLazy = (input: () => CardInputType) => (state: GameState) => {
	return {
		...state,
		cardInput: input()
	};
}


export const makePickOneInput = (cards: AbstractCard[]) => {
	return {
		text: "Select one",
		options: cards.map(makeCard),
		selections: cards.map(() => false),
		selectionCriteria: allowEQSelectionsCard(1),
		offerConfirm: (input: CardInputType) => {
			return false;
		},
		outputFunction: (input: CardInputType) => {
			return input.options[input.selections.indexOf(true)]?.effect ?? [];
		},
		cancelText: "Cancel",
		canCancel: true
	}
}