
import { gameRunManager } from '../services/run_manager'
import { useSyncExternalStore } from 'react'
import { Button } from './ui/button'

export const PreGame = () => {
	const gameRun = useSyncExternalStore(gameRunManager.subscribe, gameRunManager.getSnapshot);
	return (
		<div>
			<h1>Pre Game</h1>
			<Button onClick={() => {
				gameRunManager.startGame();
			}}>Start Game</Button>
		</div>
	)
}