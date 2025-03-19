import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher';

export function useVideos() {
	const { data, error, isLoading } = useSWR('/api/pexels', fetcher);

	return {
		videos: data || [],
		isLoading,
		error,
	};
}
