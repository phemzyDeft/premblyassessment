import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../types";

export type CartState = {
	items: Record<string, CartItem>;
};

const initialState: CartState = {
	items: {},
};

function incrementQuantity(current: number, delta: number): number {
	const next = current + delta;
	return next < 1 ? 1 : next;
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<Product>) {
			const product = action.payload;
			const existing = state.items[product.id];
			if (existing) {
				existing.quantity += 1;
			} else {
				state.items[product.id] = { product, quantity: 1 };
			}
		},
		removeFromCart(state, action: PayloadAction<string>) {
			delete state.items[action.payload];
		},
		increment(state, action: PayloadAction<string>) {
			const item = state.items[action.payload];
			if (item) item.quantity = incrementQuantity(item.quantity, 1);
		},
		decrement(state, action: PayloadAction<string>) {
			const item = state.items[action.payload];
			if (item) item.quantity = incrementQuantity(item.quantity, -1);
		},
		clearCart(state) {
			state.items = {};
		},
	},
});

export const { addToCart, removeFromCart, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
