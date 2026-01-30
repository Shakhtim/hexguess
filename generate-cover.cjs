const sharp = require('sharp');
const path = require('path');

async function generateCover() {
  try {
    const svgPath = path.join(__dirname, 'public', 'cover-800x470.svg');
    const outputPath = path.join(__dirname, 'public', 'cover-800x470.png');

    console.log('Generating 800x470 PNG cover from SVG...');

    await sharp(svgPath)
      .resize(800, 470)
      .png()
      .toFile(outputPath);

    console.log('✓ Cover generated successfully:', outputPath);
  } catch (error) {
    console.error('Error generating cover:', error.message);
  }
}

generateCover();
