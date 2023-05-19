import { useEffect } from 'react';
import { useState } from 'react';

export const useDebounce = (value, delay = 500) => {
	const [debouncedValue, setdebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setdebouncedValue(value), delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};
