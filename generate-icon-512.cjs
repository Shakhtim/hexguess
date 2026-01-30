const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcon() {
  try {
    const svgPath = path.join(__dirname, 'public', 'icon-512.svg');
    const outputPath = path.join(__dirname, 'public', 'icon-512.png');

    // Check if sharp is installed
    if (!fs.existsSync(path.join(__dirname, 'node_modules', 'sharp'))) {
      console.log('Installing sharp...');
      const { execSync } = require('child_process');
      execSync('npm install sharp', { stdio: 'inherit' });
    }

    console.log('Generating 512x512 PNG icon from SVG...');

    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(outputPath);

    console.log('✓ Icon generated successfully:', outputPath);
  } catch (error) {
    console.error('Error generating icon:', error.message);
    console.log('\nAlternative: You can use online tools to convert SVG to PNG:');
    console.log('1. Open https://cloudconvert.com/svg-to-png');
    console.log('2. Upload public/icon-512.svg');
    console.log('3. Set size to 512x512');
    console.log('4. Download and save as public/icon-512.png');
  }
}

generateIcon();
