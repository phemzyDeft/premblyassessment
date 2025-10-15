import Button from "./Button";

export default function ProductCard({ product, quantity, onAdd, onIncrement, onDecrement }) {
	return (
		<div className="rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
			<img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover" />
			<div className="p-4 flex flex-col gap-3">
				<h3 className="font-medium">{product.name}</h3>
				<p className="text-sm text-zinc-600 line-clamp-2">{product.description}</p>
				<div className="flex items-center justify-between">
					<span className="font-semibold">${product.price.toFixed(2)}</span>
					{quantity > 0 ? (
						<div className="flex items-center gap-2 border border-zinc-300 rounded-lg">
							<button
								onClick={() => onDecrement(product.id)}
								className="px-3 py-1.5 hover:bg-zinc-100 transition-colors font-semibold text-lg"
							>
								−
							</button>
							<span className="px-2 font-semibold min-w-[2rem] text-center">{quantity}</span>
							<button
								onClick={() => onIncrement(product.id)}
								className="px-3 py-1.5 hover:bg-zinc-100 transition-colors font-semibold text-lg"
							>
								+
							</button>
						</div>
					) : (
						<Button onClick={() => onAdd(product)}>Add to Cart</Button>
					)}
				</div>
			</div>
		</div>
	);
}
