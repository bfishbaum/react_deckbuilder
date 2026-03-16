import { type Card, type AbstractCard } from "../types/board"
import { useSyncExternalStore } from "react"
import { gameRunManager } from "../services/run_manager"
import { CardContainer } from "./card_container"
import { CardClass } from "./card"
import { Button } from "./ui/button"
import { makeCard } from "@/services/effects/make_card"
import React from "react"

const ShopDisplayStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	alignSelf: 'flex-start',
	height: "500px",
	width: "100%",
	gap: "20px",
	padding: "10px"
}

const ShopCardStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	alignSelf: 'flex-start',
	width: "170px",
	height: "470px",
	gap: "10px"
}

const BuyButtonStyle: React.CSSProperties = {
	border: '3px solid black',
	color: 'black',
	fontSize: '20px',
	padding: '10px',
	paddingLeft: '20px',
	paddingRight: '20px',
	borderRadius: '5px',
	cursor: "pointer"
}

const BuyButton = ({ card, buyFn, canBuy }: { card: Card, buyFn: (card: Card, price: number) => void, canBuy: boolean }) => {
	const style = {
		...BuyButtonStyle,
		backgroundColor: canBuy ? "greenyellow" : "gray"
	}
	return (
		<div style={style} onClick={() => {
			buyFn(card, card.price.gold);
		}}>
			Buy for {card.price.gold} gold
		</div>
	)
}

const ShopCard = ({ card, buyFn, canBuy }: { card: Card, buyFn: (card: Card, price: number) => void, canBuy: boolean }) => {
	if (card.name == "") {
		return <div style={ShopCardStyle}></div>
	}
	return (
		<div style={ShopCardStyle}>
			<div>
				<CardClass key={card.id} card={card} renderOnly={true}></CardClass>
			</div>
			<div>
				<BuyButton card={card} buyFn={buyFn} canBuy={canBuy} />
			</div>
		</div>
	)
}

const ShopCardDisplay = ({ cards, basics, gold }: { cards: Card[], basics: Card[], gold: number }) => {
	return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'flex-start' }}>
		<div>
			<h1>Cards</h1>
			<div style={ShopDisplayStyle}>
				{cards.map((card) => (
					<ShopCard key={card.id} card={card} buyFn={(card, price) => gameRunManager.shopManager.buyCard(card, price)} canBuy={gold >= card.price.gold}></ShopCard>
				))}
			</div>
		</div>
		<div>
			<h1>Basics</h1>
			<div style={ShopDisplayStyle}>
				{basics.map((card) => (
					<ShopCard key={card.id} card={card} buyFn={(card, price) => gameRunManager.shopManager.buyBasicCard(card, price)} canBuy={gold >= card.price.gold}></ShopCard>
				))}
			</div>
		</div >
	</div>
}

export const ShopComponent = () => {
	const shopState = useSyncExternalStore(gameRunManager.shopManager.subscribe, gameRunManager.shopManager.getSnapshot);
	return (
		<div>
			<h1>Shop</h1>
			<div>
				<p>Gold: {shopState.gold}</p>
				<p>Reroll Cost: {shopState.rerollCost}</p>
				<Button disabled={!gameRunManager.shopManager.canReroll()} onClick={() => gameRunManager.shopManager.reroll()}> Reroll</Button>
				<Button onClick={() => gameRunManager.shopManager.logShopState()}> Log Shop</Button>
				<Button onClick={() => gameRunManager.endShop()}>End Shop</Button>
			</div>
			<div>
				<ShopCardDisplay cards={shopState.cards} basics={shopState.basicCards.map(makeCard)} gold={shopState.gold} />
			</div>
		</div >
	)
}