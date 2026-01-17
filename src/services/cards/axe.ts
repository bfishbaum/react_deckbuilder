import { WOOD_ICON, type AbstractCard } from "../../types/board";
import * as effects from "../effects/effect";

export const Axe: AbstractCard = {
	name: "Axe",
	text: "Add 3 " + WOOD_ICON,
	price: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 1, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [effects.addResource("wood", 3)],
	tags: []
}