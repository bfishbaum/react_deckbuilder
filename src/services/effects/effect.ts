import { type AbstractCard, type GameState, type Resources, type ResourceKey, type Card } from "../../types/board";
import { sumResources, negResources, randomInt } from "../utils";
import { makeCard } from "./make_card";

export const addResources = (resources: Resources) => (state: GameState) => {
	return {
		...state,
		resources: sumResources([state.resources, resources])
	}
}

export const removeResources = (resources: Resources) => (state: GameState) => {
	return {
		...state,
		resources: sumResources([state.resources, negResources(resources)])
	}
}

export const addResource = (resource: ResourceKey, amount: number) => (state: GameState) => {
	return {
		...state,
		resources: {
			...state.resources,
			[resource]: state.resources[resource] + amount
		}
	}
}

export const drawCard = (state: GameState) => {
	// shuffle discard into deck if needed
	if (state.cardState.deck.length === 0) {
		state.cardState.deck.push(...state.cardState.discard);
		state.cardState.discard = [];
	}
	// if deck is still empty, return state
	if (state.cardState.deck.length === 0) {
		return state;
	}
	const randomIndex = randomInt(state.cardState.deck.length);
	const drawnCard = state.cardState.deck.splice(randomIndex, 1)[0] as Card;
	return {
		...state,
		cardState: {
			...state.cardState,
			hand: [...state.cardState.hand, drawnCard],
		}
	}
}

export const drawCards = (amount: number) => (state: GameState) => {
	for (let i = 0; i < amount; i++) {
		state = drawCard(state);
	}
	return state;
}

export const discardRandomCard = (state: GameState) => {
	if (state.cardState.hand.length === 0) {
		return state;
	}
	const randomIndex = randomInt(state.cardState.hand.length);
	const discardedCard = state.cardState.hand.splice(randomIndex, 1)[0] as Card;
	return {
		...state,
		cardState: {
			...state.cardState,
			discard: [...state.cardState.discard, discardedCard],
		}
	}
}

export const addCardToDiscard = (abstractCard: AbstractCard) => (state: GameState) => {
	return {
		...state,
		cardState: {
			...state.cardState,
			discard: [...state.cardState.discard, makeCard(abstractCard)],
		}
	}
}


export const addCardToHand = (abstractCard: AbstractCard) => (state: GameState) => {
	return {
		...state,
		cardState: {
			...state.cardState,
			hand: [...state.cardState.hand, makeCard(abstractCard)],
		}
	}
}

export const addCardToDeck = (abstractCard: AbstractCard) => (state: GameState) => {
	return {
		...state,
		cardState: {
			...state.cardState,
			deck: [...state.cardState.deck, makeCard(abstractCard)],
		}
	}
}