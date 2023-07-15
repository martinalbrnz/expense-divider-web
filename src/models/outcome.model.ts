export interface Outcome {
	id: string
	date: Date
	description: string
	amount: string
	category_id: string // OutcomeCategory
	user_id: string
}

export interface OutcomeCategory {
	id: string
	label: string
}