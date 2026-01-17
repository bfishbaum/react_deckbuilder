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

const startingDeck: Card[] = [
	...Array.from({ length: 7 }, () => makeCard(cards.Copper)),
	...Array.from({ length: 3 }, () => makeCard(cards.Silver)),
];

const initialResources: Resources = {
	food: 3,
	energy: 0,
	wood: 0,
	metal: 0,
	gold: 0,
}

const initalGameState: GameState = {
	resources: initialResources,
	stack: [],
	board: [],
	cardState: {
		deck: [...startingDeck],
		hand: [],
		discard: [],
	},
	inPlay: [],
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
			fullDeck: [...startingDeck],
			resources: initialResources,
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

	private notify = (): void => {
		// Force modification
		this.gameRun = {
			...this.gameRun,
		}
		this.listeners.forEach((listener) => listener());
	}

	public endTurn = (): void => {
		this.gameRun = {
			...this.gameRun,
			fullDeck: this.logicManager.getFullDeck(),
			gameState: this.logicManager.getSnapshot(),
			runPhase: RunPhase.SHOP,
		}
		this.notify();
	}

	public startGame = (): void => {
		this.logicManager.setGameState(drawCards(5)(initalGameState));
		this.gameRun = {
			...this.gameRun,
			runPhase: RunPhase.PLAYING,
		}
		this.notify();
	}
}

export const gameRunManager: GameRunManager = new GameRunManager();