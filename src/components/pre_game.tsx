
import { gameRunManager } from '../services/run_manager'
import { useSyncExternalStore } from 'react'
import { Button } from './ui/button'
import React from 'react'

const TITLE = "Busy Beavers"

const titleStyle: React.CSSProperties = {
	fontSize: "100px",
	fontWeight: "bold",
	textAlign: "center",
	color: "#000000",
	textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
}

const startStyle: React.CSSProperties = {
	fontSize: "100px",
	fontWeight: "bold",
	textAlign: "center",
	color: "white",
	textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
}

export const PreGame = () => {
	const gameRun = useSyncExternalStore(gameRunManager.subscribe, gameRunManager.getSnapshot);
	return (
		<div>
			<h1 style={titleStyle}>{TITLE}</h1>
			<Button style={startStyle} onClick={() => {
				gameRunManager.startGame();
			}}>Start Game</Button>
		</div>
	)
}