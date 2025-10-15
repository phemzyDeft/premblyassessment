import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

type User = {
	login: { uuid: string };
	name: { title: string; first: string; last: string };
	email: string;
	picture: { large: string };
	location: { country: string; city: string };
	phone: string;
};

export default function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = async () => {
		let cancelled = false;
		try {
			setLoading(true);
			setError(null);
			const res = await fetch("https://randomuser.me/api/?results=12&nat=us,gb,ca,au");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			if (cancelled) return;
			setUsers(data.results);
		} catch (e: any) {
			if (!cancelled) setError(e.message || "Failed to load users");
		} finally {
			if (!cancelled) setLoading(false);
		}
		return () => { cancelled = true };
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-1">Random Users</h1>
					<p className="text-sm text-gray-600 mb-3">Discover random people from around the world</p>
					<button
						onClick={fetchUsers}
						disabled={loading}
						className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Loading..." : "Generate New Users"}
					</button>
				</div>

				{loading && <Loader />}

				{error && <ErrorState message={error} />}

				{!loading && !error && users.length > 0 && (
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{users.map((u) => (
							<div 
								key={u.login.uuid} 
								className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden border border-gray-200 transition-shadow"
							>
								<div className="relative overflow-hidden">
									<img 
										src={u.picture.large} 
										alt={`${u.name.first} ${u.name.last}`}
										className="h-48 w-full object-cover" 
									/>
								</div>
								<div className="p-4">
									<h3 className="text-base font-bold text-gray-900 mb-2">
										{u.name.title} {u.name.first} {u.name.last}
									</h3>
									<div className="space-y-1.5 text-xs">
										<div className="flex items-center gap-2 text-gray-600">
											<svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
											<span className="truncate">{u.email}</span>
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
											</svg>
											<span>{u.phone}</span>
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
											<span>{u.location.city}, {u.location.country}</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</main>
	);
}

