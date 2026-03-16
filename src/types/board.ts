export interface GameState {
	resources: Resources;
	stack: Effect[];
	board: Card[];
	cardState: CardState;
	input?: InputType
	cardInput?: CardInputType
}

export interface CardState {
	deck: Card[];
	hand: Card[];
	discard: Card[];
	inPlay: Card[];
}

export type Effect = (state: GameState) => GameState;

export type AbstractCard = {
	name: string;
	text: string;
	// Cost to play the card
	cost: Resources;
	// Cost to buy the card
	price: Resources
	// Can add multiple effects to the stack
	effect: Effect[]
	tags: string[]
}

export type Card = AbstractCard & {
	id: string;
}

export const EMPTY_CARD: AbstractCard = {
	name: "",
	text: "",
	price: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	cost: { food: 0, energy: 0, wood: 0, metal: 0, gold: 0 },
	effect: [],
	tags: []
}

export type ResourceKey = "food" | "energy" | "wood" | "metal" | "gold"

export type Resources = Record<ResourceKey, number>

export const ResourceIcons: Record<ResourceKey, string> = {
	food: "🥬",
	energy: "🔋",
	wood: "🪵",
	metal: "⚙️",
	gold: "💰",
}

export const ResourcesZero: Resources = {
	food: 0,
	energy: 0,
	wood: 0,
	metal: 0,
	gold: 0,
}

export const FOOD_ICON = "🥬"
export const ENERGY_ICON = "🔋"
export const WOOD_ICON = "🪵"
export const METAL_ICON = "⚙️"
export const GOLD_ICON = "💰"



export interface InputType {
	text?: string
	options: string[]
	selections: boolean[]
	selectionCriteria: (input: InputType) => boolean
	offerConfirm: (input: InputType) => boolean
	outputFunction: (input: InputType) => Effect[]
	cancelText: string
	canCancel: boolean
}

export interface CardInputType {
	options: Card[]
	text?: string
	selections: boolean[]
	selectionCriteria: (input: CardInputType) => boolean
	offerConfirm: (input: CardInputType) => boolean
	outputFunction: (input: CardInputType) => Effect[]
	cancelText: string
	canCancel: boolean
}

export type TRIGGER_TYPES =
	"AFTER_TURN"
	| "AFTER_CARD_PLAYED"
	| `AFTER_${ResourceKey}_ADDED`

export interface Permanent {
	name: string;
	text: string;
	tags: string[];
	triggers: Record<TRIGGER_TYPES, Effect[]>;
}