import { useCallback, useEffect, useState } from 'react';

export default function useDimentions(myRef: React.RefObject<HTMLDivElement>) {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const handleResize = useCallback(() => {
		if (!myRef.current) {
			return;
		}

		setWidth(myRef.current.offsetWidth);
		setHeight(myRef.current.offsetHeight);
	}, [myRef]);

	useEffect(() => {
		window.addEventListener('load', handleResize);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('load', handleResize);
			window.removeEventListener('resize', handleResize);
		};
	}, [myRef, handleResize]);

	return { width, height };
}

export function useWindowDimensions() {
	const hasWindow = typeof window !== 'undefined';

	const getWindowDimensions = useCallback(() => {
		const width = hasWindow ? window.innerWidth : null;
		const height = hasWindow ? window.innerHeight : null;
		return {
			width,
			height,
		};
	}, [hasWindow]);

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		if (hasWindow) {
			const handleResize = () => {
				setWindowDimensions(getWindowDimensions());
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [hasWindow, getWindowDimensions]);

	return windowDimensions;
}
