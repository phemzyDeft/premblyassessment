import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate to="/products" replace />} />
				<Route path="/*" element={<Navigate to="/products" replace />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;