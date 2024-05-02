import express from 'express';
import cors from 'cors';
import session from 'express-session';
import './load-environment';
import { initDiscord } from '@/auth/discord';
import { handleStatic } from '@/handlers/static';

const app = express();
const PORT = process.env.HOST_PORT;

app.use(cors({

	origin: process.env.WEB_HOST,
	credentials: true
}));

/// https://github.com/expressjs/session
/// req.session.sessionVar = 1
app.use(session({
	secret: process.env.SESSION_SECRET!,
	resave: true,
	saveUninitialized: true,
	name: process.env.SESSION_COOKIE_NAME,
	cookie: {
		sameSite: 'lax',
	}
}));

initDiscord(app);

app.post('/@me', (req, res) => {

	res.json({
		loggedIn: req.session.loggedIn ?? false
	});

});

/// Handle static file routes.
if (process.env.SERVE_STATIC) {
	handleStatic(app);
}


app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});