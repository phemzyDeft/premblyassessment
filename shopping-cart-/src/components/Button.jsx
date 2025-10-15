import { ButtonHTMLAttributes } from "react";

export default function Button({ variant = "primary", className = "", ...props }) {
	const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
	const variants = {
		primary: "bg-black text-white hover:bg-zinc-800 focus:ring-black",
		secondary: "bg-white text-black border border-zinc-300 hover:bg-zinc-50 focus:ring-zinc-300",
		ghost: "bg-transparent text-black hover:bg-zinc-100 focus:ring-zinc-200",
	};
	return (
		<button className={[base, variants[variant], className].join(" ")} {...props} />
	);
}
