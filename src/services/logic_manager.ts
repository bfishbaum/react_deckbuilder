import { type Card, type GameState } from "../types/board";
import * as cards from "./card_index";
import { makeCard } from "./effects/make_card";
import { subResources } from "./utils";
import React from "react";
import { gameRunManager } from "./run_manager";

const isCardPlayable = (card: Card, gameState: GameState): boolean => {
	return card.cost.food <= gameState.resources.food &&
		card.cost.energy <= gameState.resources.energy &&
		card.cost.wood <= gameState.resources.wood &&
		card.cost.metal <= gameState.resources.metal &&
		card.cost.gold <= gameState.resources.gold
}

export class LogicManager extends React.Component {
	gameState: GameState;
	listeners = new Set<() => void>();
	constructor(gameState: GameState) {
		super(gameState);
		this.gameState = gameState;
	}

	public subscribe = (listener: () => void) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		}
	}

	public getSnapshot = (): GameState => {
		return this.gameState;
	}

	private notify = (): void => {
		// Force reload by recreating object
		this.gameState = {
			...this.gameState,
		}
		this.listeners.forEach((listener) => listener());
	}

	public setGameState = (gameState: GameState): void => {
		this.gameState = gameState;
		this.notify();
	}

	public playCard = (cardKey: string): void => {
		if (this.gameState.input) {
			console.log("Can't play more cards until input decided")
			return;
		}
		console.log("played card");
		const cardIndex: number = this.gameState.cardState.hand.findIndex((card) => card.id === cardKey);
		if (cardIndex === -1) {
			return;
		}

		const card = this.gameState.cardState.hand[cardIndex];
		if (!card || !isCardPlayable(card, this.gameState)) {
			return;
		}

		this.gameState.cardState.hand.splice(cardIndex, 1);
		this.gameState.resources = subResources(this.gameState.resources, card.cost); this.gameState.stack.push(...card.effect);
		this.evaluate();
		this.gameState.inPlay.push(card);
		this.notify();
	}

	public canPlayAnyCards = (): boolean => {
		return this.gameState.cardState.hand.some((card) => isCardPlayable(card, this.gameState));
	}

	public getGameState = (): GameState => {
		return this.gameState;
	}

	public toggleInputSelection = (index: number): void => {
		if (!this.gameState.input) {
			console.log("No input to toggle");
			return;
		}
		this.gameState.input.selections[index] = !this.gameState.input.selections[index];
		this.notify();
	}

	public acceptInput = (): void => {
		if (!this.gameState.input) {
			console.log("No input to accept");
			return;
		}
		if (!this.gameState.input.selectionCriteria(this.gameState.input)) {
			return;
		}
		this.gameState.stack.push(...this.gameState.input.outputFunction(this.gameState.input));
		this.gameState.input = undefined;
		this.evaluate();
		this.notify();
	}

	public toggleCardInputSelection = (index: number): void => {
		if (!this.gameState.cardInput) {
			console.log("No card input to toggle");
			return;
		}
		this.gameState.cardInput.selections[index] = !this.gameState.cardInput.selections[index];
		this.notify();
	}

	public acceptCardInput = (): void => {
		if (!this.gameState.cardInput) {
			console.log("No card input to accept");
			return;
		}
		if (!this.gameState.cardInput.selectionCriteria(this.gameState.cardInput)) {
			return;
		}
		this.gameState.stack.push(...this.gameState.cardInput.outputFunction(this.gameState.cardInput));
		this.gameState.cardInput = undefined;
		this.evaluate();
		this.notify();
	}

	public getFullDeck = (): Card[] => {
		return [
			...this.gameState.cardState.deck,
			...this.gameState.cardState.hand,
			...this.gameState.cardState.discard,
			...this.gameState.inPlay,
		]
	}


	public endTurn = (): void => {
		this.gameState.cardState.deck = this.getFullDeck();
		this.notify();
	}

	private evaluate = (): void => {
		while (this.gameState.stack.length > 0) {
			if (this.gameState.input || this.gameState.cardInput) {
				// Don't continue evaluating through inputs - stop and wait for user
				return;
			}
			const eff = this.gameState.stack.pop()
			if (!eff) {
				break;
			}
			this.gameState = eff(this.gameState);
		}
	}
}