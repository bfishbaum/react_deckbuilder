import * as cards from "./card_index";
import { makeCard } from "./effects/make_card";
import { drawCards } from "./effects/effect";
import {
	type Resources,
	type GameState,
	type Card,
	type AbstractCard,
} from "../types/board";
import React from "react";
import { LogicManager } from "./logic_manager";
import { ShopManager } from "./shop_manager";

export type GameSettings = {
	startingDeck: Card[];
	startingResources: Resources;
	startingHandSize: number;
}

export enum RunPhase {
	PRE_GAME,
	PLAYING,
	SHOP,
	POST_GAME,
}

export interface GameRun {
	gameState: GameState;
	fullDeck: Card[];
	resources: Resources;
	runPhase: RunPhase;
}


const STARTING_DECK: Card[] = [
	...Array.from({ length: 3 }, () => makeCard(cards.FoodCoin)),
	...Array.from({ length: 3 }, () => makeCard(cards.Forage)),
	...Array.from({ length: 3 }, () => makeCard(cards.Gold)),
];

const INITIAL_RESOURCES: Resources = {
	food: 5,
	energy: 0,
	wood: 0,
	metal: 0,
	gold: 0,
}
const STARTING_HAND_SIZE = 5;

const initalGameState: GameState = {
	resources: INITIAL_RESOURCES,
	stack: [],
	board: [],
	cardState: {
		deck: [...STARTING_DECK],
		hand: [],
		discard: [],
		inPlay: []
	},
	input: undefined,
}

class GameRunManager {
	gameRun: GameRun;
	listeners = new Set<() => void>();
	logicManager: LogicManager;
	shopManager: ShopManager;

	constructor() {
		this.gameRun = {
			gameState: {
				...initalGameState,
			},
			fullDeck: [...STARTING_DECK],
			resources: INITIAL_RESOURCES,
			runPhase: RunPhase.PRE_GAME,
		}
		this.logicManager = new LogicManager(this.gameRun.gameState);
		this.shopManager = new ShopManager([], 0);
	}

	public subscribe = (listener: () => void) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		}
	}

	public getSnapshot = (): GameRun => {
		return this.gameRun;
	}

	public logGameState = (): void => {
		this.logicManager.logGameState();
	}

	private notify = (): void => {
		// Force modification
		this.gameRun = {
			...this.gameRun,
		}
		this.listeners.forEach((listener) => listener());
	}

	public endTurn = (): void => {
		console.log("ending turn");
		this.logicManager.endTurn();
		const gameState = this.logicManager.getSnapshot();
		this.gameRun = {
			...this.gameRun,
			fullDeck: this.logicManager.getFullDeck(),
			gameState,
			runPhase: RunPhase.SHOP,
		}
		this.shopManager.setUp(gameState.resources.gold)
		this.notify();
	}

	public endShop = (): void => {
		const shopState = this.shopManager.getSnapshot();
		let gameState = {
			...this.gameRun.gameState,
			cardState: {
				...this.gameRun.gameState.cardState,
				hand: [] as Card[],
				discard: [...this.gameRun.gameState.cardState.discard, ...this.gameRun.gameState.cardState.hand, ...shopState.boughtCards],
			},
			resources: {
				...this.gameRun.gameState.resources,
				gold: shopState.gold,
			},
		}
		gameState = drawCards(STARTING_HAND_SIZE)(gameState);
		this.logicManager.setGameState(gameState);
		this.notify();
		this.gameRun = {
			...this.gameRun,
			gameState,
			runPhase: RunPhase.PLAYING,
		}
		this.notify();
	}

	public startGame = (): void => {
		this.logicManager.setGameState(drawCards(STARTING_HAND_SIZE)(initalGameState));
		this.gameRun = {
			...this.gameRun,
			runPhase: RunPhase.PLAYING,
		}
		this.notify();
	}

}

export const gameRunManager: GameRunManager = new GameRunManager();