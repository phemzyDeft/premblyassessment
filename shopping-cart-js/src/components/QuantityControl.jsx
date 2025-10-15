import Button from "./Button";

export default function QuantityControl({ value, onIncrement, onDecrement }) {
	return (
		<div className="inline-flex items-center gap-2">
			<Button variant="secondary" onClick={onDecrement} aria-label="Decrease quantity">-</Button>
			<span className="min-w-[2ch] text-center tabular-nums">{value}</span>
			<Button variant="secondary" onClick={onIncrement} aria-label="Increase quantity">+</Button>
		</div>
	);
}
