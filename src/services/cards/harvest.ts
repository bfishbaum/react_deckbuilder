import { FOOD_ICON, type AbstractCard } from "../../types/board";
import * as effects from "../effects/effect";

export const Harvest: AbstractCard = {
	name: "Harvest",
	text: "Add 3 " + FOOD_ICON,
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [effects.addResource("food", 3)],
	tags: []
}