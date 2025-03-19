export function extractTitleFromURL(url: string): string {
	const parts = url.split('/video/');
	if (parts.length < 2) return '';
	let titlePart = parts[1].replace(/\/$/, '');
	titlePart = titlePart.replace(/-\d+$/, '');
	let formattedTitle = titlePart.replace(/-/g, ' ');

	formattedTitle = formattedTitle.replace(/\b\w/g, char => char.toUpperCase());

	return formattedTitle;
}
