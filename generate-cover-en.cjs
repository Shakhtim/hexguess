const sharp = require('sharp');
const path = require('path');

async function generateCoverEN() {
  try {
    const svgPath = path.join(__dirname, 'public', 'cover-800x470-en.svg');
    const outputPath = path.join(__dirname, 'public', 'cover-800x470-en.png');

    console.log('Generating 800x470 PNG English cover from SVG...');

    await sharp(svgPath)
      .resize(800, 470)
      .png()
      .toFile(outputPath);

    console.log('✓ English cover generated successfully:', outputPath);
  } catch (error) {
    console.error('Error generating English cover:', error.message);
  }
}

generateCoverEN();
