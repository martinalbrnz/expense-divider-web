import { UserRecord } from "./authUser.model"
import { CategoryRecord } from "./category.model"

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
}

export type RegisterType = 'income' | 'expense'

export interface RegisterRecord {
	amount: number;
	category: string;
	collectionId: string;
	collectionName: string;
	created: Date;
	date: Date;
	description: string;
	expand: { user_id: UserRecord; category: CategoryRecord };
	id: string;
	receipt_url?: string;
	type: RegisterType;
	updated: Date;
	user_id: string;
}
