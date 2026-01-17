import { type AbstractCard, type Card, type Resources } from "../types/board";

export interface ShopState {
	cards: Card[];
	gold: number;
}

export class ShopManager {
	shopState: ShopState;
	listeners = new Set<() => void>();
	constructor(cards: Card[], gold: number) {
		this.shopState = {
			cards: cards,
			gold: gold,
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

	private notify = (): void => {
		// Force reload by recreating object
		this.shopState = {
			...this.shopState,
		}
		this.listeners.forEach((listener) => listener());
	}
}