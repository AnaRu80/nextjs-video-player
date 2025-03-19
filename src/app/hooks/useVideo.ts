'use client';

import useSWR from 'swr';

const fetcher = async (url: string) => {
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

export function useVideo(id: string | string[] | undefined) {
	const { data, error, isLoading } = useSWR(
		id ? `/api/pexels/${id}` : null,
		fetcher
	);

	return {
		video: data,
		isLoading,
		error,
	};
}
