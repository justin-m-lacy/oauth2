import { nanoid } from 'nanoid';

export const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? 'connect.sid';

/**
 * Create a session variable to identify the session.
 * @param sess 
 */
export const createState = () => {

	return nanoid();

}