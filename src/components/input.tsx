import { gameRunManager } from '../services/run_manager'
import React, { useSyncExternalStore } from 'react'

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

const InputOption = ({ option, isSelected, index, selectFn }: { option: string, isSelected: boolean, index: number, selectFn: () => void }) => {
	const style: React.CSSProperties =
	{
		borderColor: isSelected ? "aqua" : "red",
		borderWidth: "12px",
		borderStyle: "solid",
	}
	return (
		<>
			<div style={style} className="input-option" onClick={() => {
				selectFn();
			}}>
				{option}
			</div>
		</>
	)
}

export const InputContainer = () => {
	// const gameState = useSyncExternalStore(logicManager.subscribe, logicManager.getSnapshot);
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	const isInputState = gameState.input !== undefined;
	const isValid = gameState.input?.selectionCriteria(gameState.input);
	const inputButtonStyle: React.CSSProperties = {
		backgroundColor: isValid ? "greenyellow" : "#FF0000",
	}
	return (
		<div className="input-container">
			<style> {`.input-container {
				visibility: ${isInputState ? "visible;" : "hidden;"}
			}
			`}</style>
			<div style={optionContainerStyle}>
				{gameState.input?.options.map((option, index) => (
					<InputOption key={index} option={option} isSelected={gameState.input?.selections[index] ?? false} index={index} selectFn={() => {
						gameRunManager.logicManager.toggleInputSelection(index);
					}} />
				))}
			</div>
			<style>{`
				${isValid ? "" : "input-button { background-color: #FF0000; }"}
				.input-button:hover {
					background-color: ${isValid ? "greenyellow" : "#FF0000"};
				}
				`}
			</style>
			<div style={inputButtonStyle} className="input-button" onClick={() => {
				gameRunManager.logicManager.acceptInput();
			}}><p>Confirm</p></div>
		</div>
	)
}