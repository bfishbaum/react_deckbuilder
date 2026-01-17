import { type AbstractCard, FOOD_ICON, GOLD_ICON, type GameState } from "../../types/board";

const convertFoodToGold = (gameState: GameState) => {
	return {
		...gameState,
		resources: {
			...gameState.resources,
			gold: gameState.resources.gold + gameState.resources.food,
			food: 0
		}
	}
}

export const Grocery: AbstractCard = {
	name: "Grocery",
	text: `Convert all ${FOOD_ICON} to ${GOLD_ICON}`,
	price: { food: 0, energy: 0, wood: 2, metal: 0, gold: 0 },
	cost: { food: 0, energy: 0, wood: 2, metal: 0, gold: 0 },
	effect: [convertFoodToGold],
	tags: []
}