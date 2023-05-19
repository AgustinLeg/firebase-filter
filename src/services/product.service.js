import {
	collection,
	query,
	getDocs,
	startAt,
	endAt,
	orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const allProductsWithFilter = async ({ name, price, category }) => {
	const q = query(
		collection(db, 'products'),
		orderBy('name'),
		startAt(name),
		endAt(name + '\uf8ff')
	);

	const querySnapshot = await getDocs(q);

	const products = querySnapshot.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.filter((product) => {
			if (category && product.category !== category) {
				return false;
			}

			if (price && product.price > price) {
				return false;
			}

			return true;
		});

	return products;
};
