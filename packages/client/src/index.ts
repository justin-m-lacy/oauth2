import express from 'express';
import cors from 'cors';
import session from 'express-session';
import './load-environment';
import { initDiscord } from '@/auth/discord';
import { handleStatic } from '@/handlers/static';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.HOST_PORT;

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true,
	methods: ['GET', 'HEAD', 'POST', 'OPTIONS']
}));

/// https://github.com/expressjs/session
/// req.session.sessionVar = 1
app.use(session({
	secret: process.env.SESSION_SECRET!,
	resave: true,
	saveUninitialized: true,
	name: process.env.SESSION_COOKIE_NAME,
	cookie: {
		sameSite: 'strict',
	}
}));

app.use(bodyParser.json());

app.post('/@me', (req, res) => {

	res.json({
		loggedIn: req.session.loggedIn ?? false
	});

});

initDiscord(app);

/// Handle static file routes.
if (process.env.SERVE_STATIC) {
	handleStatic(app);
}


app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});