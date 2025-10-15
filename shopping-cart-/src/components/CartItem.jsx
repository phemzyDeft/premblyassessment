import Button from "./Button";
import QuantityControl from "./QuantityControl";

export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
	const { product, quantity } = item;
	return (
		<div className="grid grid-cols-[80px_1fr_auto] gap-4 items-center py-3 border-b border-zinc-200">
			<img src={product.imageUrl} alt={product.name} className="h-20 w-20 object-cover rounded-md border" />
			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<h4 className="font-medium">{product.name}</h4>
					<Button variant="ghost" onClick={onRemove}>Remove</Button>
				</div>
				<p className="text-sm text-zinc-600">${product.price.toFixed(2)}</p>
			</div>
			<div className="flex items-center gap-4">
				<QuantityControl value={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
				<span className="font-semibold tabular-nums">${(product.price * quantity).toFixed(2)}</span>
			</div>
		</div>
	);
}
