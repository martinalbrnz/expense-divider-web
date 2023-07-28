export function currency(amount: number) {
	return new Intl.NumberFormat("es", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}