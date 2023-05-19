import { useEffect } from 'react';
import './App.css';
import { allProductsWithFilter } from './services/product.service';
import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';

function App() {
	const [products, setProducts] = useState([]);
	const [filters, setFilters] = useState({
		name: '',
		category: '',
		price: 0,
	});

	const debounceValue = useDebounce(filters);

	useEffect(() => {
		console.log('filtrando...');
		const getData = async () => {
			const products = await allProductsWithFilter(debounceValue);

			setProducts(products);
		};

		getData();
	}, [debounceValue]);

	// console.log('filters', filters);
	// console.log('debounce', debounceValue);

	return (
		<main>
			<h1>Lista de productos</h1>
			<div>
				<input
					value={filters.name}
					onChange={(e) => {
						setFilters({
							...filters,
							name: e.target.value,
						});
					}}
				/>
			</div>
			{products.map((product) => (
				<div key={product.id}>
					<p>{product.name}</p>
					<p>{product.price}</p>
					<p>{product.category}</p>
				</div>
			))}
		</main>
	);
}

export default App;
