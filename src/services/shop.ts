import { type AbstractCard, type CardInputType } from "../types/board";
import { cardList } from "./card_list";
import { allowLTESelectionsCard } from "./effects/input";
import { addCardToDeck } from "./effects/effect";
import { makeCard } from "./effects/make_card";
import { pickNWithReplacement } from "./utils";

export type AbstractCardFilter = (card: AbstractCard) => boolean;

export const isBasicCard = (card: AbstractCard) => {
	return card.tags.includes("BASIC");
}

export const isNotBasicCard = (card: AbstractCard) => {
	return !card.tags.includes("BASIC");
}


export const filterByPrice = (min: number, max: number) => {
	return (card: AbstractCard) => {
		return card.price.gold >= min && card.price.gold <= max;
	}
}

export const filterCards = (filters: AbstractCardFilter[]) => {
	return cardList.filter((card) => filters.every((filter) => filter(card)));
}

export const getSomeCards = (k: number, filters: AbstractCardFilter[]) => {
	return pickNWithReplacement(filterCards(filters), k).map(makeCard);
}

export const createShopInputByFilters = (filters: AbstractCardFilter[]) => {
	return {
		text: "Select a card to buy",
		options: getSomeCards(5, filters),
		selections: getSomeCards(5, filters).map(() => false),
		selectionCriteria: allowLTESelectionsCard(1),
		offerConfirm: (input: CardInputType) => {
			return input.selections.every((selection) => selection == false);
		},
		outputFunction: (input: CardInputType) => {
			return [addCardToDeck(input.options[input.selections.indexOf(true)] as AbstractCard)]
		},
		cancelText: "Cancel",
		canCancel: true
	}
}

export const BASIC_CARDS = filterCards([k => k.tags.includes("BASIC")]);