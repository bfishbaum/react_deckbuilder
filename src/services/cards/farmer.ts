import { FOOD_ICON, type AbstractCard } from "../../types/board";
import * as effects from "../effects/effect";

export const Farmer: AbstractCard = {
	name: "Farmer",
	text: "Add 3 " + FOOD_ICON,
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 1 },
	cost: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [effects.addResource("food", 3)],
	tags: []
}