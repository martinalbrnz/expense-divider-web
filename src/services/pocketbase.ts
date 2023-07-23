import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_API_URL);

export const login = async (user: string, password: string) => {
	return await pb
		.collection("users")
		.authWithPassword(user, password);
};
