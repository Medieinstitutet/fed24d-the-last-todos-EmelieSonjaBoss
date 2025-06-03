import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ICON_SIZES = [64, 192, 512];
const ICON_COLOR = '#b16e82';

async function generateIcons() {
  // Create a basic SVG icon
  const svg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="${ICON_COLOR}" rx="128"/>
      <path d="M 128 256 L 224 352 L 384 192" stroke="white" stroke-width="48" fill="none"/>
    </svg>
  `;

  // Ensure the public directory exists
  const publicDir = join(__dirname, '..', 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir);
  }

  // Generate icons for different sizes
  for (const size of ICON_SIZES) {
    const fileName = size === 64 ? 'favicon.ico' : `logo${size}.png`;
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .toFile(join(publicDir, fileName));
    
    console.log(`Generated ${fileName}`);
  }
}

generateIcons().catch(console.error); 