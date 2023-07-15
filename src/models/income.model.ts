export interface Income {
	id: string
	date: Date
	description?: string
	amount: number
	category_id: string // IncomeCategory
	user_id: string
}

export interface IncomeCategory {
	id: string
	label: string
}