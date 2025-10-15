import { useEffect } from "react";

type Props = {
	message: string;
	onClose: () => void;
	duration?: number;
};

export default function Toast({ message, onClose, duration = 2000 }: Props) {
	useEffect(() => {
		const timer = setTimeout(onClose, duration);
		return () => clearTimeout(timer);
	}, [onClose, duration]);

	return (
		<div className="fixed top-4 right-0 left-0 flex justify-center z-50 animate-slide-down">
			<div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
				<span className="font-medium text-xs">{message}</span>
			</div>
		</div>
	);
}