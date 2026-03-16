import React from "react";
import { CardClass } from "./card";
import { gameRunManager } from '../services/run_manager'
import { useSyncExternalStore } from 'react'

const cardContainerStyle: React.CSSProperties = {
	textAlign: "center",
	alignContent: "center",
	justifyContent: "center",
}

const cardCountStyle: React.CSSProperties = {
	fontSize: "100px",
	alignContent: "center",
	verticalAlign: "center",
}

export const CardContainer = () => {
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	return (
		<div className="card-container">
			<div className="deck" style={cardContainerStyle}>
				<p style={cardCountStyle}>{gameState.cardState.deck.length}</p>
			</div>
			<div className="hand">
				{gameState.cardState.hand.map((card) => (
					<CardClass key={card.id} card={card} />
				))}
			</div>
			<div style={cardContainerStyle} className="discard">
				<p style={cardCountStyle}>{gameState.cardState.discard.length}</p>
			</div>
		</div>
	)
}