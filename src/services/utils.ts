import { type Resources, type Card } from "../types/board";

export const sumResources = (resources: Resources[]) => {
	return resources.reduce((a, b) => {
		for (const [key, value] of Object.entries(b)) {
			a[key as keyof Resources] += value
		}
		return a
	})
}

export const negResources = (resources: Resources): Resources => {
	return {
		food: -resources.food,
		energy: -resources.energy,
		wood: -resources.wood,
		metal: -resources.metal,
		gold: -resources.gold
	}
}

export const subResources = (r1: Resources, r2: Resources): Resources => {
	return sumResources([r1, negResources(r2)])
}

export function cutOutValue<T>(list: T[], value: T) {
	const idx = list.findIndex(c => (c == value));
	if (idx < 0) {
		return undefined
	}
	return {
		item: value,
		list: [...list.slice(0, idx), ...list.slice(idx + 1)]
	}
}

export function cutOutIndex<T>(list: T[], idx: number) {
	if (idx > list.length) {
		return undefined
	}
	return {
		item: list[idx] as T,
		list: [...list.slice(0, idx), ...list.slice(idx + 1)]
	}
}

// Fisher-Yates shuffle
export const shuffle = (array: any[]): any[] => {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

// Random int between 0 and n-1
export const randomInt = (n: number): number => {
	return Math.floor(Math.random() * n);
}

export const pickNWithReplacement = (list: any[], n: number): any[] => {
	return Array.from({ length: n }).map(() => list[randomInt(list.length)])
}

export const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}