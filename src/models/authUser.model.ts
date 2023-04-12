import { User } from "./user.model";

export interface AuthUser {
	model: User
	token: string
}