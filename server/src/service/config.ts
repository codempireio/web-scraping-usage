import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const config = dotenv.parse(fs.readFileSync('.env'));