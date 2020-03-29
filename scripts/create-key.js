#!/usr/bin/env node
console.log('\ncopy/paste the key in your .env file \n');

console.log(`JWT_SECRET_KEY=${require('crypto').randomBytes(256).toString('base64')}`);

console.log('\n')

