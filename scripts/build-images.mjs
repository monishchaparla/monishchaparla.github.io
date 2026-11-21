// Builds web-sized images from the originals in /photos into /public/assets.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public/assets", { recursive: true });

// Wide hero photo (original is the uncropped selfie)
await sharp("photos/DEEPU_IMAGE-01.png")
  .resize({ width: 1920 })
  .webp({ quality: 80 })
  .toFile("public/assets/hero.webp");

// Round avatar source
await sharp("photos/PROFILE_PIC.png")
  .resize({ width: 720, height: 720, fit: "cover" })
  .webp({ quality: 82 })
  .toFile("public/assets/avatar.webp");

// Social share image 1200x630
await sharp("photos/DEEPU_IMAGE-01.png")
  .resize({ width: 1200, height: 630, fit: "cover", position: "right" })
  .jpeg({ quality: 82 })
  .toFile("public/assets/share.jpg");

console.log("images built");
