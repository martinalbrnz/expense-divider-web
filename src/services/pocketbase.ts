import Pocketbase, { RecordAuthResponse } from 'pocketbase'

const pb = new Pocketbase(import.meta.env.VITE_API_URL)

export const login = async (email: string, pass: string): Promise<RecordAuthResponse> => {
	const userData = await pb.collection('users').authWithPassword(email, pass)
	localStorage.setItem('token', userData.token)
	localStorage.setItem('id', userData.record.id)
	localStorage.setItem('avatar', `${import.meta.env.VITE_API_URL}/api/files/${userData.record.collectionId}/${userData.record.id}/${userData.record.avatar}`)
	localStorage.setItem('name', userData.record.name)
	localStorage.setItem('username', userData.record.username)
	localStorage.setItem('email', userData.record.email)

	return userData
}

export const getIncomes = async (): Promise<Record<string, any>> => {
	return await pb.collection('incomes').getFullList()
}

export function logout() {
	pb.authStore.clear()
	localStorage.clear()
}
