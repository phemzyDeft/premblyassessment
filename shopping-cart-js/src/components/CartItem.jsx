import Button from "./Button";
import QuantityControl from "./QuantityControl";

export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
	const { product, quantity } = item;
	return (
		<div className="flex flex-col sm:grid sm:grid-cols-[80px_1fr_auto] gap-4 py-4 border-b border-zinc-200">
			<img src={product.imageUrl} alt={product.name} className="h-20 w-20 object-cover rounded-md border" />
			<div className="space-y-2">
				<div className="flex items-start justify-between gap-2">
					<h4 className="font-medium">{product.name}</h4>
					<Button variant="ghost" onClick={onRemove} className="text-sm">Remove</Button>
				</div>
				<p className="text-sm text-zinc-600">${product.price.toFixed(2)}</p>
			</div>
			<div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
				<QuantityControl value={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
				<span className="font-semibold tabular-nums text-lg">${(product.price * quantity).toFixed(2)}</span>
			</div>
		</div>
	);
}
