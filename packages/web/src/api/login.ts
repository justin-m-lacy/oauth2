export async function apiGetLogin() {

	const AuthHost = import.meta.env.VITE_AUTH_HOST;

	const res = await fetch(`${AuthHost}/@me`, {
		method: 'POST',
		credentials: 'include'
	});


	const logState: { loggedIn: boolean } = await res.json();

	return logState;

}