import { readFileSync, writeFileSync } from 'fs';
import ttf2woff2 from 'ttf2woff2';

const input = readFileSync('public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf');
const output = ttf2woff2(input);
writeFileSync('public/fonts/Inter/Inter-VariableFont_opsz,wght.woff2', output);
console.log('Done. Wrote WOFF2.');
