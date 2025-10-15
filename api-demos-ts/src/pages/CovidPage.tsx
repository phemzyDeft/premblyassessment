import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

type Row = {
	dateChecked: string;
	positive: number | null;
	death: number | null;
};

const ITEMS_PER_PAGE = 20;

export default function CovidPage() {
	const [allRows, setAllRows] = useState<Row[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch("https://api.covidtracking.com/v1/us/daily.json");
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data: Row[] = await res.json();
				if (cancelled) return;
				setAllRows(data);
			} catch (e: any) {
				if (!cancelled) setError(e.message || "Failed to load stats");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => { cancelled = true };
	}, []);

	const totalPages = Math.ceil(allRows.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentRows = allRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

const formatDate = (dateString: string) => {
	if (!dateString) return "-";

	// Try converting using native Date
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return dateString; // Return original if invalid date

	return date.toLocaleDateString('en-US', { 
		year: 'numeric', 
		month: 'short', 
		day: 'numeric' 
	});
};

	const formatNumber = (num: number | null) => {
		if (num === null) return "-";
		return num.toLocaleString('en-US');
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
			<div className="mx-auto max-w-6xl px-4">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-1">COVID-19 Statistics</h1>
					<p className="text-sm text-gray-600">United States Daily Data</p>
				</div>

				{loading && <Loader />}

				{error && <ErrorState message={error} />}

				{!loading && !error && currentRows.length > 0 && (
					<>
						<div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="bg-gray-100 border-b border-gray-300">
											<th className="px-4 py-3 text-left font-semibold text-gray-700">Date Checked</th>
											<th className="px-4 py-3 text-left font-semibold text-gray-700">Positive Cases</th>
											<th className="px-4 py-3 text-left font-semibold text-gray-700">Deaths</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{currentRows.map((r, idx) => (
											<tr
												key={r.dateChecked} 
												className={`hover:bg-gray-50 transition-colors ${
													idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
												}`}
											>
												<td className="px-4 text-left py-3 text-gray-900">
													{formatDate(r.dateChecked)}
												</td>
												<td className="px-4 py-3 text-left tabular-nums text-gray-900">
													{formatNumber(r.positive)}
												</td>
												<td className="px-4 py-3 text-left tabular-nums text-gray-900">
													{formatNumber(r.death)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						{/* Pagination */}
						<div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-lg shadow px-4 py-3 border border-gray-200">
							<div className="text-xs text-gray-600">
								Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{" "}
								<span className="font-semibold text-gray-900">
									{Math.min(startIndex + ITEMS_PER_PAGE, allRows.length)}
								</span>{" "}
								of <span className="font-semibold text-gray-900">{allRows.length}</span> entries
							</div>
							
							<div className="flex items-center gap-1">
								<button
									disabled={currentPage === 1}
									onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
									className="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									Prev
								</button>
								
								<div className="flex items-center gap-1">
									{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
										let pageNum;
										if (totalPages <= 5) {
											pageNum = i + 1;
										} else if (currentPage <= 3) {
											pageNum = i + 1;
										} else if (currentPage >= totalPages - 2) {
											pageNum = totalPages - 4 + i;
										} else {
											pageNum = currentPage - 2 + i;
										}
										
										return (
											<button
												key={pageNum}
												onClick={() => setCurrentPage(pageNum)}
												className={`px-3 py-1 text-sm rounded transition-colors ${
													currentPage === pageNum
														? 'bg-blue-600 text-white'
														: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
												}`}
											>
												{pageNum}
											</button>
										);
									})}
								</div>

								<button
									disabled={currentPage === totalPages}
									onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
									className="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									Next
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</main>
	);
}

