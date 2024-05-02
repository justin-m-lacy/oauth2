import { request } from 'undici';
import auth from './discord-auth.json';
import type { Express } from 'express';
import { DiscordAuth } from '@/types/discord';
import { createState } from '@/util/crypt';

export function initDiscord(app: Express) {

	// Site actually hosting the web files.
	// This allows the auth server to be separate from the file host.
	const WEB_HOST = process.env.WEB_HOST ??
		`${process.env.HOST_URI}:${process.env.HOST_PORT}`;

	app.get('/login/discord', async (req, res) => {

		const state = createState();

		/// express-session doesn't actually store the state in browser,
		/// only a session-id
		req.session.state = state;

		const target = new URL(auth.AUTH_ENDPOINT);
		target.searchParams.set('client_id', auth.CLIENT_ID);
		target.searchParams.set('response_type', 'code');
		target.searchParams.set('state', state);
		target.searchParams.set(
			'redirect_uri',
			`${process.env.HOST_URI}:${process.env.HOST_PORT}/auth/discord`
		);
		target.searchParams.set('scope', auth.SCOPE);

		/// redirect to the auth endpoint.
		res.redirect(target.toString());

	});

	/// Use access code to request an access token from Discord.
	app.get('/auth/discord', async (req, res, next) => {

		const code = req.query.code;
		const state = req.query.state;

		if (typeof code !== 'string') {
			// improper code.
			console.warn(`missing code: ${code}`);
			res.redirect(WEB_HOST);
			return;
		} else if (typeof state !== 'string'
			|| !req.session.state
			|| state !== req.session.state) {
			// invalid or missing 'stat'
			console.warn(`Invalid state: '${state}' Expected: '${req.session.state}'`);
			res.redirect(WEB_HOST);
			return;
		}

		try {
			const tokenInfo = await requestAccessToken(code);

			console.log(`access Token success: ${tokenInfo.access_token}`);
			req.session.discordAuth = tokenInfo;

		} catch (err) {
			//next(err);
		}

		res.redirect(WEB_HOST);

	});

}


export async function requestAccessToken(code: string) {

	/// NOTE: redirect_uri must exactly match the one used when requesting code
	const result = await request(`${auth.API_ENDPOINT}${auth.TOKEN_ROUTE}`, {

		method: 'POST',
		body: new URLSearchParams({

			client_id: auth.CLIENT_ID,
			client_secret: auth.CLIENT_SECRET,
			grant_type: 'authorization_code',
			code: code,
			scope: auth.SCOPE,
			redirect_uri: `${process.env.HOST_URI}:${process.env.HOST_PORT}/auth/discord`
		}).toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}

	});

	if (result.statusCode !== 200) {
		console.log(`retrieve access token failed: ${result.statusCode}`);
		const errorInfo = await result.body.text();
		throw new Error(`Token Failed: ${errorInfo}`)


	}
	return await result.body.json() as DiscordAuth;

}