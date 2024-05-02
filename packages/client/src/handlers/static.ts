import express from 'express';
import path from 'path';

export function handleStatic(app: express.Application) {

	const STATIC_PATH = path.resolve(process.cwd(), process.env.STATIC_PATH ?? '/');

	app.get('/favicon.ico', (req, res) => res.status(204));

	app.use('/', express.static(STATIC_PATH));

	console.log(`serving static assets from: ${STATIC_PATH}`);

}