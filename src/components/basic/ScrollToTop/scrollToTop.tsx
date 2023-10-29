import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const hashElement = document.getElementById(location.hash.substring(1));
			if (hashElement) {
				window.scrollTo(0, 0);
				hashElement.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			window.scrollTo(0, 0);
		}
	}, [location]);

	return null;
};

export default ScrollToTop;
