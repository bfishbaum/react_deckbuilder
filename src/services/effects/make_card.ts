import { type AbstractCard, type Card } from "../../types/board";
import { v4 as uuid } from 'uuid';

export const makeCard = (abstractCard: AbstractCard): Card => {
	return {
		...abstractCard,
		id: uuid(),
	}
}