// Script to generate PNG icons from SVG
// Run: node generate-icons.js

import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join } from 'path'

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'mstile-150x150.png', size: 150 }
]

async function generateIcons() {
  try {
    const svgBuffer = readFileSync(join('public', 'favicon.svg'))

    console.log('🎨 Generating PNG icons from SVG...\n')

    for (const { name, size } of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(join('public', name))

      console.log(`✅ Created ${name} (${size}x${size}px)`)
    }

    console.log('\n🎉 All icons generated successfully!')
    console.log('📁 Check the public/ folder for the new icons.')
  } catch (error) {
    console.error('❌ Error generating icons:', error.message)
    console.log('\n💡 Install sharp: npm install sharp')
  }
}

generateIcons()
