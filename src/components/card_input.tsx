import { gameRunManager } from '../services/run_manager'
import React, { useSyncExternalStore } from 'react'
import { type Card, type CardInputType } from '../types/board'
import { CardClass } from './card'
import { Button } from './ui/button';

const optionContainerStyle: React.CSSProperties = {
	borderColor: "red",
	width: "90%",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	margin: "auto",
	gap: "1rem",
}

const CardInputOption = ({ option, isSelected, index, selectFn }: { option: Card, isSelected: boolean, index: number, selectFn: () => void }) => {
	const style: React.CSSProperties =
	{
		borderColor: isSelected ? "greenyellow" : "red",
		borderWidth: "5px",
		borderStyle: "solid",
		margin: "px",
	}
	return (
		<>
			<div style={style} className="card-input-option" onClick={() => {
				selectFn();
			}}>
				<CardClass card={option} renderOnly={true} />
			</div>
		</>
	)
}

export const CardInputContainer = () => {
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	const isInputState = gameState.cardInput !== undefined;
	const isValid = gameState.cardInput?.selectionCriteria(gameState.cardInput);
	const inputButtonStyle: React.CSSProperties = {
		backgroundColor: isValid ? "greenyellow" : "#FF0000",
	}
	return (
		<div className="input-container">
			<div style={{ margin: "auto" }}>
				<p style={{ textAlign: "center", fontSize: "2rem" }}>{gameState.cardInput?.text}</p>
			</div>
			<style> {`.input-container {
				visibility: ${isInputState ? "visible;" : "hidden;"}
			}
			`}</style>
			<div style={optionContainerStyle}>
				{gameState.cardInput?.options.map((option, index) => {
					const isSelected = gameState.cardInput?.selections[index] ?? false;
					const style: React.CSSProperties = {
						borderColor: isSelected ? "greenyellow" : "red",
						borderWidth: "3px",
						borderStyle: "solid",
						top: `${200 * (index / 4)}px`,
						left: `${100 * (index % 4)}px`,
					}
					return (
						<div>
							<CardInputOption key={index} option={option} isSelected={isSelected} index={index} selectFn={() => {
								gameRunManager.logicManager.toggleCardInputSelection(index);
							}} />
						</div>
					)
				})}
			</div>
			<Button className="input-button" style={inputButtonStyle} onClick={() => {
				gameRunManager.logicManager.acceptCardInput();
			}}><p>Confirm</p></Button>
		</div>
	)
}