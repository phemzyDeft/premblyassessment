import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";

export default function ProductsPage() {
	const dispatch = useAppDispatch();
	return (
		<main className="mx-auto max-w-6xl px-4 py-6">
			<h1 className="text-2xl font-semibold mb-4">Products</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((p) => (
					<ProductCard key={p.id} product={p} onAdd={(prod) => dispatch(addToCart(prod))} />
				))}
			</div>
		</main>
	);
}
