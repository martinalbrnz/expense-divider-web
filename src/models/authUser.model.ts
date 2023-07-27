import { User } from "./user.model";

export interface AuthUser {
	model: User
	token: string
}

export interface UserRecord {
	avatar?: string
	collectionId: string
	collectionName: string
	created: Date
	emailVisibility: boolean
	id: string
	name: string
	updated: Date
	username: string
	verified: boolean
}