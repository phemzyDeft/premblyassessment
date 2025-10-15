import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increment, decrement, removeFromCart, clearCart } from "../store/cartSlice";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

export default function CartPage() {
	const items = useAppSelector((s) => s.cart.items);
	const dispatch = useAppDispatch();
	const list = Object.values(items);
	const subtotal = list.reduce((sum, it) => sum + it.product.price * it.quantity, 0);

	return (
		<main className="mx-auto max-w-6xl px-4 py-6">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-semibold">Your Cart</h1>
				{list.length > 0 && (
					<Button variant="ghost" onClick={() => dispatch(clearCart())}>Clear cart</Button>
				)}
			</div>

			{list.length === 0 ? (
				<p className="text-zinc-600">Your cart is empty.</p>
			) : (
				<div className="grid gap-6 lg:grid-cols-[1fr_320px]">
					<section className="space-y-0">
						{list.map(({ product, quantity }) => (
							<CartItem
								key={product.id}
								item={{ product, quantity }}
								onIncrement={() => dispatch(increment(product.id))}
								onDecrement={() => dispatch(decrement(product.id))}
								onRemove={() => dispatch(removeFromCart(product.id))}
							/>
						))}
					</section>

					<aside className="h-fit rounded-xl border border-zinc-200 p-4 space-y-4">
						<h2 className="font-medium">Order Summary</h2>
						<div className="flex items-center justify-between text-sm">
							<span>Subtotal</span>
							<span className="tabular-nums">${subtotal.toFixed(2)}</span>
						</div>
						<div className="flex items-center justify-between text-sm">
							<span>Shipping</span>
							<span className="tabular-nums">$0.00</span>
						</div>
						<hr />
						<div className="flex items-center justify-between font-semibold">
							<span>Total</span>
							<span className="tabular-nums">${subtotal.toFixed(2)}</span>
						</div>
						<Button className="w-full">Checkout</Button>
					</aside>
				</div>
			)}
		</main>
	);
}
