const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'logo192': 192,
  'logo512': 512
};

async function convertSvgToPng() {
  for (const [name, size] of Object.entries(sizes)) {
    const svgPath = path.join(__dirname, '..', 'public', `${name}.svg`);
    const pngPath = path.join(__dirname, '..', 'public', `${name}.png`);

    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);
      
      console.log(`Successfully converted ${name}.svg to ${name}.png`);
    } catch (error) {
      console.error(`Error converting ${name}.svg:`, error);
    }
  }
}

convertSvgToPng(); 