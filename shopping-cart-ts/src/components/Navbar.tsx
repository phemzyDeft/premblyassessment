import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function Navbar() {
	const items = useAppSelector((s) => s.cart.items);
	const count = Object.values(items).reduce((sum, it) => sum + it.quantity, 0);
	return (
		<header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
			<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
				<Link to="/products" className="font-semibold">Prembly Shop</Link>
				<nav className="flex items-center gap-6">
					<NavLink to="/products" className={({ isActive }) => isActive ? "text-black" : "text-zinc-600 hover:text-black"}>Products</NavLink>
					<NavLink to="/cart" className={({ isActive }) => isActive ? "text-black" : "text-zinc-600 hover:text-black"}>
						Cart{count > 0 ? ` (${count})` : ""}
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
