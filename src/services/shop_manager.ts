import { WOOD_ICON, type AbstractCard, type Card, type Resources, EMPTY_CARD } from "../types/board";
import { Copper, FoodCoin } from "./card_index";
import { BASIC_CARDS, type AbstractCardFilter } from "./shop";
import { getSomeCards } from "./shop";
import { cutOutValue } from "./utils";
import { makeCard } from "./effects/make_card";
import { isNotBasicCard } from "./shop";

const BASE_CARDS_IN_SHOP_COUNT = 5;



export interface ShopState {
	// Basic cards are cards that are always available in the shop
	// No limit and never disappear
	basicCards: AbstractCard[];
	cards: Card[];
	gold: number;
	boughtCards: Card[];
	rerollCost: number;
}

export class ShopManager {
	shopState: ShopState;
	listeners = new Set<() => void>();
	constructor(cards: Card[], gold: number) {
		this.shopState = {
			cards: getSomeCards(BASE_CARDS_IN_SHOP_COUNT, [isNotBasicCard]),
			basicCards: BASIC_CARDS,
			gold: gold,
			boughtCards: [],
			rerollCost: -100
		}
	}

	public subscribe = (listener: () => void) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		}
	}

	public getSnapshot = (): ShopState => {
		return this.shopState;
	}

	public logShopState = (): void => {
		console.log(this.shopState);
	}

	private notify = (): void => {
		// Force reload by recreating object
		this.shopState = {
			...this.shopState,
		}
		this.listeners.forEach((listener) => listener());
	}

	public setUp(gold: number) {
		this.shopState = {
			...this.shopState,
			cards: getSomeCards(BASE_CARDS_IN_SHOP_COUNT, [isNotBasicCard]),
			gold
		}
	}

	public buyCard(card: Card, cost: number) {
		console.log("buying card", card, cost);
		if (cost > this.shopState.gold) {
			return false;
		}
		const idx = this.shopState.cards.findIndex((c) => c.id === card.id);
		this.shopState.cards[idx] = makeCard(EMPTY_CARD);
		if (idx < 0) {
			console.log("not split")
			return false;
		}
		this.shopState = {
			...this.shopState,
			gold: this.shopState.gold - cost,
			boughtCards: [...this.shopState.boughtCards, card]
		}
		this.notify();
	}

	public buyBasicCard(card: AbstractCard, cost: number) {
		console.log("buying basic card", card, cost);
		if (cost > this.shopState.gold) {
			return false;
		}
		this.shopState = {
			...this.shopState,
			gold: this.shopState.gold - cost,
			boughtCards: [...this.shopState.boughtCards, makeCard(card)]
		}
		this.notify();
	}


	public canReroll() {
		return this.shopState.rerollCost <= this.shopState.gold;
	}

	public reroll() {
		if (this.canReroll()) {
			this.shopState = {
				...this.shopState,
				gold: this.shopState.gold - this.shopState.rerollCost,
				rerollCost: this.shopState.rerollCost + 1,
				cards: getSomeCards(BASE_CARDS_IN_SHOP_COUNT, [])
			}
			this.notify();
		}
	}
}