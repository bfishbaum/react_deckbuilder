import { ResourcePanel } from './resource_panel'
import { CardContainer } from './card_container'
import { useSyncExternalStore } from 'react'
import { gameRunManager } from '../services/run_manager'
import { InputContainer } from './input'
import { PlayArea } from './play_area'
import { CardClass } from './card'
import { Play } from 'lucide-react'
import { PlayedCards } from './played_cards'
import { CardInputContainer } from './card_input'
import { Button } from './ui/button'

export const BoardClass = () => {
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	return (
		<div className="board" style={{ top: 0, left: 0, width: '100%', height: '100%', margin: '0px' }}>
			<div className="top-panel" style={{ display: 'flexbox', flexDirection: 'row', alignItems: 'left', alignSelf: 'flex-start' }}>
				<ResourcePanel resources={gameState.resources} />
				<PlayArea />
			</div>
			<div className="middle-panel">
				<PlayedCards />
				<div>
					<div style={{ border: '3px solid black', color: 'black', fontSize: '20px', padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '5px' }} onClick={() => {
						gameRunManager.endTurn();
					}}>
						End Turn
					</div>
				</div>
				{/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'left', scale: 0.5 }}>
					{gameState.inPlay.map((card, index) => (
						<CardClass key={index} card={card} />
					))}
				</div> */}
			</div>
			<div className="bottom-panel" style={{ margin: '0px', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', height: '40%', display: 'flex' }}>
				<CardContainer />
			</div>
			{gameState.input && <InputContainer />}
			{gameState.cardInput && <CardInputContainer />}
		</div>
	)
}