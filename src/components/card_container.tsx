import React from "react";
import { CardClass } from "./card";
import { gameRunManager } from '../services/run_manager'
import { useSyncExternalStore } from 'react'

export const CardContainer = () => {
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	return (
		<div className="card-container">
			<div className="deck">
				<p>{gameState.cardState.deck.length}</p>
			</div>
			<div className="hand">
				{gameState.cardState.hand.map((card) => (
					<CardClass key={card.id} card={card} />
				))}
			</div>
			<div className="discard">
				<p>{gameState.cardState.discard.length}</p>
			</div>
		</div>
	)
}