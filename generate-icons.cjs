const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const svgPath = path.join(__dirname, 'public', 'brand-emblem.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. 192x192 icon with dark luxury background
  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 8, g: 8, b: 8, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(svgBuffer).resize(150, 150).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(path.join(__dirname, 'public', 'pwa-192x192.png'));

  // 2. 512x512 icon
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 8, g: 8, b: 8, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(svgBuffer).resize(400, 400).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(path.join(__dirname, 'public', 'pwa-512x512.png'));

  // 3. 512x512 maskable icon with 15% safe-zone margin
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 8, g: 8, b: 8, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(svgBuffer).resize(350, 350).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(path.join(__dirname, 'public', 'pwa-maskable-512x512.png'));

  // 4. Apple Touch Icon 180x180
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 8, g: 8, b: 8, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(svgBuffer).resize(140, 140).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));

  console.log('All PWA luxury icons generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
