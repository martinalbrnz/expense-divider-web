import { JSX } from "solid-js/web/types/jsx"

export interface NavItemI {
	label: string
	path: string
	icon: JSX.Element
	role?: string[]
	children?: NavItemI[]
	extraClass?: string
}