export interface Register {
	id: string
	date: Date
	description: string
	type: RegisterType
	amount: number
	user_id: string
	category: RegisterCategory
	receipt_url?: string
}

export interface RegisterCategory {
	id: string
	label: string
	short_name: string
}

export type RegisterType = 'income' | 'expense' 
