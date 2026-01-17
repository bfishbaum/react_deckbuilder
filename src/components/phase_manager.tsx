import { RunPhase } from "../services/run_manager";
import { BoardClass } from "./board";
import { PreGame } from "./pre_game";
import { gameRunManager } from '../services/run_manager'
import { useSyncExternalStore } from 'react'

export const PhaseManager = () => {
	const gameRun = useSyncExternalStore(gameRunManager.subscribe, gameRunManager.getSnapshot);
	return (
		<div>
			{gameRun.runPhase === RunPhase.PLAYING && <BoardClass />}
			{gameRun.runPhase === RunPhase.PRE_GAME && <PreGame />}
			{gameRun.runPhase === RunPhase.SHOP && <Shop />}
		</div>
	)
}