import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage";
import CovidPage from "./pages/CovidPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
	return (
		<BrowserRouter>
			<header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
				<div className="mx-auto max-w-7xl px-4 py-3">
					<nav className="flex items-center justify-between flex-wrap gap-3">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<span className="text-lg font-bold text-gray-900">API Demos</span>
						</div>
						<div className="flex items-center divide-x divide-gray-300">

							<NavLink
								to="/api/covid"
								className={({ isActive }) =>
									`px-3 py-1.5 text-sm font-medium transition-colors ${isActive
										? 'text-blue-600'
										: 'text-gray-600 hover:text-gray-900'
									}`
								}
							>
								COVID
							</NavLink>
							<NavLink
								to="/api/users"
								className={({ isActive }) =>
									`px-3 py-1.5 text-sm font-medium transition-colors ${isActive
										? 'text-blue-600'
										: 'text-gray-600 hover:text-gray-900'
									}`
								}
							>
								Users
							</NavLink>

							<NavLink
								to="/api/quotes"
								className={({ isActive }) =>
									`px-3 py-1.5 text-sm font-medium transition-colors ${isActive
										? 'text-blue-600'
										: 'text-gray-600 hover:text-gray-900'
									}`
								}
							>
								Quotes
							</NavLink>
						</div>
					</nav>
				</div>
			</header>
			<Routes>
				<Route path="/" element={<Navigate to="/api/covid" replace />} />
				<Route path="/*" element={<Navigate to="/api/covid" replace />} />
				<Route path="/api/quotes" element={<QuotesPage />} />
				<Route path="/api/covid" element={<CovidPage />} />
				<Route path="/api/users" element={<UsersPage />} />
			</Routes>
		</BrowserRouter>
	);
}

