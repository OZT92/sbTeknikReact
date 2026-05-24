import sharp from 'sharp';
import { mkdirSync } from 'fs';

mkdirSync('public/img/services', { recursive: true });

const images = [
  ['src/img/services/elektrikliElAletleri.png', 'public/img/services/elektrikli-el-aletleri.webp'],
  ['src/img/services/isGuvenligi.png',          'public/img/services/is-guvenligi.webp'],
  ['src/img/services/nalburiye.png',             'public/img/services/nalburiye.webp'],
  ['src/img/services/tesisatMalzemeleri.png',   'public/img/services/tesisat-malzemeleri.webp'],
  ['src/img/services/yapiKimyasallari.png',     'public/img/services/yapi-kimyasallari.webp'],
  ['src/img/services/yapiMalzemeleri.png',      'public/img/services/yapi-malzemeleri.webp'],
];

for (const [src, dest] of images) {
  await sharp(src).webp({ quality: 82, effort: 6 }).toFile(dest);
  console.log(`Converted: ${dest}`);
}
