import { type GameState, type InputType, type CardInputType } from "../../types/board";

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

export const setCardInputEffect = (input: CardInputType) => (state: GameState) => {
	return {
		...state,
		cardInput: Object.assign({}, input),
	};
}

