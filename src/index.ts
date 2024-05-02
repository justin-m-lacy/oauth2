import express from 'express';
import session from 'express-session';
import './load-environment';
import { initDiscord } from '@/auth/discord';
import { handleStatic } from '@/handlers/static';

const app = express();
const PORT = process.env.HOST_PORT;

/// https://github.com/expressjs/session
/// req.session.sessionVar = 1
app.use(session({
	secret: process.env.SESSION_SECRET!,
	resave: false,
	saveUninitialized: true,
	cookie: {
		sameSite: 'lax'
	}
}));

initDiscord(app);

/// Handle static file routes.
if (process.env.SERVE_STATIC) {
	handleStatic(app);
}

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});