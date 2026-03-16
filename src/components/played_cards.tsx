import { CardClass } from "./card";
import { useSyncExternalStore } from "react";
import { gameRunManager } from "../services/run_manager";

export const PlayedCards = () => {
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	return (
		<div className="played-cards-area">
			{gameState.cardState.inPlay.map((card) => (
				<CardClass key={card.id} card={card} renderOnly={true} useSmallSize={true} />
			))}
		</div>
	)
}