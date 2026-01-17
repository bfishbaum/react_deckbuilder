import { ResourcePanel } from './resource_panel'
import { CardContainer } from './card_container'
import { useSyncExternalStore } from 'react'
import { gameRunManager } from '../services/run_manager'
import { Permanent } from './permanent'

const MAX_PERMANENTS = 3;
const COLS = 1;


export const PlayArea = () => {
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	return (
		<div className="play-area">
			<div className="permanent-row">
				{Array.from({ length: MAX_PERMANENTS }, (_, i) => (
					<Permanent />
				))}
			</div>
			<div className="permanent-row">
				{Array.from({ length: MAX_PERMANENTS }, (_, i) => (
					<Permanent />
				))}
			</div >
		</div >
	)
}