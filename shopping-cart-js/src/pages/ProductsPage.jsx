import { useState } from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";
import { addToCart, increment, decrement } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function ProductsPage() {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((s) => s.cart.items);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
		setToastMessage(`${product.name} added to cart!`);
		setShowToast(true);
	};

	const handleIncrement = (productId) => {
		dispatch(increment(productId));
	};

	const handleDecrement = (productId) => {
		dispatch(decrement(productId));
	};

	return (
		<main className="mx-auto max-w-6xl px-4 py-6">
			<h1 className="text-2xl font-semibold mb-4">Products</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{products.map((p) => (
					<ProductCard 
						key={p.id} 
						product={p} 
						quantity={cartItems[p.id]?.quantity || 0}
						onAdd={handleAddToCart}
						onIncrement={handleIncrement}
						onDecrement={handleDecrement}
					/>
				))}
			</div>
			{showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
		</main>
	);
}
