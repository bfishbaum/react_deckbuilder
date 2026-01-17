import { useSyncExternalStore } from "react"
import { gameRunManager } from "../services/run_manager"

export const Shop = () => {
	const shopState = useSyncExternalStore(gameRunManager.shop.subscribe, gameRunManager.getSnapshot);
	return (
		<div>
			<h1>Shop</h1>
		</div>
	)
}