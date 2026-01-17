import { FOOD_ICON, type AbstractCard, type CardInputType, type Card, type Effect } from "../../types/board";
import { setCardInputEffect, allowEQSelectionsCard } from "../effects/input";
import { addResource, drawCards } from "../effects/effect";
import { makeCard } from "../effects/make_card";

const leftCard: AbstractCard = {
	name: "Left",
	text: "Gain 3 food",
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [addResource("food", 3)],
	tags: []
}

const rightCard: AbstractCard = {
	name: "Right",
	text: "Draw 2",
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [drawCards(2)],
	tags: []
}

const input: CardInputType = {
	text: "Select one",
	options: [
		makeCard(leftCard),
		makeCard(rightCard),
	],
	selections: [false, false],
	selectionCriteria: allowEQSelectionsCard(1),
	offerConfirm: (input: CardInputType) => {
		return false;
	},
	outputFunction: (input: CardInputType) => {
		const effects: Effect[] = [];
		for (let i = 0; i < input.selections.length; i++) {
			if (input.selections[i]) {
				effects.push(...(input.options[i]?.effect ?? []));
			}
		}
		return effects;
	},
	cancelText: "Cancel",
	canCancel: true
}

export const ForkInTheRoad: AbstractCard = {
	name: "Fork In The Road",
	text: `Select one: \nGain 2 ${FOOD_ICON} or Draw 3`,
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 2, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [setCardInputEffect(input)],
	tags: []
}