import { nanoid } from 'nanoid';

/**
 * Create a session variable to identify the session.
 * @param sess 
 */
export const createState = () => {

	return nanoid();

}