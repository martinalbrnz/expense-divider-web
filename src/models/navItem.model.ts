import { IconTypes } from "solid-icons"

export interface NavItemI {
	label: string
	path: string
	icon: IconTypes
	role?: string[]
	children?: NavItemI[]
	extraClass?: string
}