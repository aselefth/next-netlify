export function getProbabilityColor(num: number) {
	if (num < 40) {
		return 'text-shadow-green';
	} else if (num >= 60 && num < 80) {
		return 'text-shadow-orange';
	} else if (num >= 80) {
		return 'text-shadow-red';
	}
	return 'text-shadow-yellow';
}
