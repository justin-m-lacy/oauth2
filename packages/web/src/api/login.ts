const AuthHost = import.meta.env.VITE_AUTH_CLIENT;

type LoginResult = {
	loggedIn: boolean
}

export async function apiGetLogin() {

	const res = await fetch(`${AuthHost}/@me`, {
		method: 'POST',
		credentials: 'include'
	});


	const logState = await res.json() as LoginResult;

	return logState;

}

export async function apiSendGrantCode(code: string, state: string) {

	const res = await fetch(`${AuthHost}/auth/discord`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		body: JSON.stringify({ code: code, state: state }),
		headers: {
			'Content-Type': 'application/json'
		}
	},);

	const result = await res.json() as LoginResult;

	return result;

}