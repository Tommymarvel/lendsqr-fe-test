import { writeFileSync } from 'fs';
import { generateFakeUsers } from '../src/services/api/generateFakeData';

// Generate 500 fake users
const users = generateFakeUsers(500);

// Write to public/users.json
writeFileSync('./public/users.json', JSON.stringify(users, null, 2), 'utf-8');

console.log('✅ Generated 500 fake users in public/users.json');
