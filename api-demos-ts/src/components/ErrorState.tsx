type Props = { message?: string };
export default function ErrorState({ message = "Something went wrong." }: Props) {
	return (
		<div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
			{message}
		</div>
	);
}

