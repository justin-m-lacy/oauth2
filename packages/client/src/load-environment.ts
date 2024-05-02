import path from 'path';
import dotenv from 'dotenv';

const mode = process.env.NODE_ENV;

console.log(`Working directory: '${process.cwd()}' Mode: '${mode}'`);

const baseEnvPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: baseEnvPath });

if (mode != null && mode.toLowerCase() !== 'production') {

	const modeFilePath = path.resolve(process.cwd(), `.env.${mode}`);
	dotenv.config({ path: modeFilePath, override: true })

	console.log(`using environment file: ${modeFilePath}`);

}

