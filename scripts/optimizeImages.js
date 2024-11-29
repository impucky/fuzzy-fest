import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";
import { confirmPrompt } from "./utils.js";

const inputPath = process.argv[2];
const quality = parseInt(process.argv[3]);

if (
  typeof inputPath !== "string" ||
  typeof quality !== "number" ||
  quality > 100 ||
  quality < 0
) {
  console.log("Must provide a path and a quality setting between 0-100");
  process.exit();
}

const inputFiles = fs.readdirSync(inputPath).filter((file) => {
  const ext = path.extname(file);
  return ext === ".jpg" || ext === ".png";
});

if (inputFiles.length === 0) {
  console.log("Wrong path or no files to process, exiting...");
}

(async () => {
  console.log("Processing", inputFiles, ` with quality ${quality}`);
  const confirmProcess = await confirmPrompt("Proceed?");

  if (confirmProcess) {
    await imagemin([`${inputPath}/*.{jpg,png}`], {
      destination: inputPath,
      plugins: [imageminWebp({ quality })],
    });
  }

  console.log("Images optimized");

  const confirmDelete = await confirmPrompt("Delete input images?");

  if (confirmDelete) {
    inputFiles.forEach((file) => {
      const filePath = path.join(inputPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting images", err);
        }
      });
    });
    console.log("Input images deleted");
  }

  console.log("All done, exiting...");
})();
