import Button from "./Button";
import type { Product } from "../types";

type Props = {
	product: Product;
	onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
	return (
		<div className="rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
			<img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover" />
			<div className="p-4 flex flex-col gap-3">
				<h3 className="font-medium">{product.name}</h3>
				<p className="text-sm text-zinc-600 line-clamp-2">{product.description}</p>
				<div className="flex items-center justify-between">
					<span className="font-semibold">${product.price.toFixed(2)}</span>
					<Button onClick={() => onAdd(product)}>Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}
