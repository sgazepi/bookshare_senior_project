import React, {createContext, useState} from 'react';
import { getTextbook} from './services/TextbookService.js';
export const CartContext = createContext();
export function CartProvider (props) {
	const [items, setItems] = useState([]);

	const addItemToCart = async (id, bid, start_date, end_date) => {
		const textbook = await getTextbook (id);
		setItems((prevItems) => {
			const item = prevItems.find((item) => (item.id == id));
			const duration = (end_date-start_date)/3600000;
			return [...prevItems, {
				id,
				textbook,
				bid: bid,
				start_date: start_date,
				end_date: end_date,
				duration: duration,
				totalPrice: duration * bid,
			}];
		});
	}

	function getItemsCount() {
		return items.reduce((sum, item) => (sum + 1), 0);
	}
	
	function getTotalPrice() {
		return items.reduce((sum, item) => (sum + item.totalPrice), 0);
	}

	return (
		<CartContext.Provider
			value = {{items, setItems, getItemsCount, addItemToCart, getTotalPrice}}>
			{props.children}
		</CartContext.Provider>
	);
}
