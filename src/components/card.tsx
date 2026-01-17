import { type Resources, ResourceIcons, type Card, ResourcesZero } from "../types/board";
import React, { useState } from "react";
import { gameRunManager } from '../services/run_manager'
import { useSyncExternalStore } from 'react'

const isCardPlayable = (card: Card, resources: Resources): boolean => {
	return card.cost.food <= resources.food && card.cost.energy <= resources.energy && card.cost.wood <= resources.wood && card.cost.metal <= resources.metal
}

export const CardClass = ({ card, renderOnly = false, useSmallSize = false }: { card: Card, renderOnly?: boolean, useSmallSize?: boolean }) => {
	const [isHovered, setIsHovered] = useState(false)
	const gameState = useSyncExternalStore(gameRunManager.logicManager.subscribe, gameRunManager.logicManager.getSnapshot);
	const renderCost = (cost: Resources) => {
		if (cost !== ResourcesZero) {
			return (
				<div>
					{Object.entries(cost).map(([resourceName, amount]) => (
						ResourceIcons[resourceName as keyof Resources].repeat(amount)
					)).reduce((a, b) => a + b)}
				</div>
			)
		} else {
			return (
				<div>
					<span>Free</span>
				</div>
			)
		}
	}
	const isPlayable = isCardPlayable(card, gameState.resources);


	const fontSize = 20 * (1 / Math.ceil(card.name.length / 20)) + "px";
	const titleStyle: React.CSSProperties = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: "black",
		height: "30%",
		fontSize: fontSize,
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
	const cardDynamicStyle: React.CSSProperties = {
		borderColor: renderOnly ? "black" : isHovered ? isPlayable ? "aqua" : "red" : "black",
		cursor: renderOnly ? "default" : isHovered ? isPlayable ? "pointer" : "not-allowed" : "pointer",
		margin: renderOnly ? "20px" : "auto",
	}
	console.log(card.name, fontSize)

	return (
		<>
			<div className={useSmallSize ? "card card-small" : "card"} style={cardDynamicStyle} onClick={renderOnly ? undefined : () => {
				gameRunManager.logicManager.playCard(card.id);
			}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div style={titleStyle}>
					<p style={{ margin: "0px", textAlign: "center" }}>{card.name}</p>
				</div>
				<br />
				<br />
				<p>{card.text}</p>
				<div className="card-cost">{renderCost(card.cost)}</div>
			</div >
		</>
	)
}