import { type AbstractCard, type ResourceKey, ResourceIcons, GOLD_ICON, FOOD_ICON, ENERGY_ICON, WOOD_ICON, METAL_ICON, ResourcesZero } from "@/types/board";
import * as effects from "../effects/effect";
import { addResource } from "../effects/effect";
import { setCardInputEffectLazy, makePickOneInput } from "../effects/input";
import { capitalize } from "../utils";

const resourceCoinFactory = (resourceKey: ResourceKey) => {
	const leftCard: AbstractCard = {
		name: capitalize(resourceKey),
		text: "Add " + ResourceIcons[resourceKey],
		price: ResourcesZero,
		cost: ResourcesZero,
		effect: [addResource(resourceKey, 1)],
		tags: []
	}

	const rightCard: AbstractCard = {
		name: "Gold",
		text: "Add " + GOLD_ICON,
		price: ResourcesZero,
		cost: ResourcesZero,
		effect: [addResource("gold", 1)],
		tags: []
	}

	return {
		name: capitalize(resourceKey) + " Coin",
		text: "Add 1 " + ResourceIcons[resourceKey] + " or 1 " + GOLD_ICON,
		cost: ResourcesZero,
		price: { ...ResourcesZero, gold: 1 },
		effect: [setCardInputEffectLazy(() => makePickOneInput([leftCard, rightCard]))],
		tags: ["BASIC"]
	}
}

export const FoodCoin: AbstractCard = resourceCoinFactory("food");
// export const EnergyCoin: AbstractCard = resourceCoinFactory("energy");
// export const WoodCoin: AbstractCard = resourceCoinFactory("wood");
// export const MetalCoin: AbstractCard = resourceCoinFactory("metal");