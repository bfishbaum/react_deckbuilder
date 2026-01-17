import { ENERGY_ICON, type AbstractCard } from "../../types/board";
import * as effects from "../effects/effect";

export const Burn: AbstractCard = {
	name: "Burn",
	text: "Add 1 " + ENERGY_ICON,
	price: { food: 0, energy: 0, wood: 4, metal: 0, gold: 0 },
	cost: { food: 0, energy: 0, wood: 4, metal: 0, gold: 0 },
	effect: [effects.addResource("energy", 1)],
	tags: []
}