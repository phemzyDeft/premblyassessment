import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function QuotesPage() {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [quotes, setQuotes] = useState<Array<{ _id: string; content: string; author: string }>>([]);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch(`https://quotable.io/quotes?page=${page}`);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = await res.json();
				if (cancelled) return;
				setQuotes(data.results);
				setTotalPages(data.totalPages ?? data.total_pages ?? 1);
			} catch (e: any) {
				if (!cancelled) setError(e.message || "Failed to load quotes");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => { cancelled = true };
	}, [page]);

	return (
		<main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
			<div className="mx-auto max-w-5xl px-4">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-1">Inspirational Quotes</h1>
					<p className="text-sm text-gray-600">Wisdom from great minds</p>
				</div>

				{loading && <Loader />}

				{error && <ErrorState message={error} />}

				{!loading && !error && (
					<>
						<div className="space-y-4">
							{quotes.map((q) => (
								<figure 
									key={q._id} 
									className="bg-white rounded-lg shadow border border-gray-200 p-5 hover:shadow-md transition-shadow"
								>
									<blockquote className="text-base text-gray-800 leading-relaxed italic">
										"{q.content}"
									</blockquote>
									<figcaption className="mt-3 text-sm text-gray-600">
										— {q.author}
									</figcaption>
								</figure>
							))}
						</div>

						{/* Pagination */}
						<div className="mt-6 flex items-center justify-center gap-3 bg-white rounded-lg shadow px-4 py-3 border border-gray-200">
							<button 
								disabled={page <= 1} 
								onClick={() => setPage((p) => Math.max(1, p - 1))} 
								className="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								Prev
							</button>
							<span className="tabular-nums text-sm text-gray-700">
								Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
							</span>
							<button 
								disabled={page >= totalPages} 
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))} 
								className="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								Next
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
