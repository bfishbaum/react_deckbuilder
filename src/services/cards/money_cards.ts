import { type Card, type AbstractCard, GOLD_ICON } from "../../types/board";
import * as effects from "../effects/effect";
import { v4 as uuid } from 'uuid';

export const Copper: AbstractCard = {
	name: "Copper",
	text: "Add 1 " + GOLD_ICON,
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [effects.addResource("gold", 1)],
	tags: ["MONEY"]
}

export const Silver: AbstractCard = {
	name: "Silver",
	text: "Add 2 " + GOLD_ICON,
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 2 },
	effect: [effects.addResource("gold", 3)],
	tags: ["MONEY"]
}

export const Gold: AbstractCard = {
	name: "Gold",
	text: "Add 3 " + GOLD_ICON,
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 4 },
	effect: [effects.addResource("gold", 3)],
	tags: ["MONEY"]
}

export const Platinum: AbstractCard = {
	name: "Platinum",
	text: "Add 4 " + GOLD_ICON,
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 6 },
	effect: [effects.addResource("gold", 4)],
	tags: ["MONEY"]
}

export const Sapphire: AbstractCard = {
	name: "Sapphire",
	text: "Add 6 " + GOLD_ICON,
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 12 },
	effect: [effects.addResource("gold", 6)],
	tags: ["MONEY", "JEWEL"]
}

export const Ruby: AbstractCard = {
	name: "Ruby",
	text: "Add 8 " + GOLD_ICON,
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 16 },
	effect: [effects.addResource("gold", 8)],
	tags: ["MONEY", "JEWEL"]
}

export const Diamond: AbstractCard = {
	name: "Diamond",
	text: "Add 10 " + GOLD_ICON,
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 20 },
	effect: [effects.addResource("gold", 10)],
	tags: ["MONEY", "JEWEL"]
}