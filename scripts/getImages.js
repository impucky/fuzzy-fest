import axios from "axios";
import fm from "front-matter";
import fs from "fs";
import path from "path";
import bcfetch from "bandcamp-fetch";
import cmpstr from "cmpstr";

async function getAllBands() {
  const search = bcfetch.limiter.search;
  const bandFiles = fs.readdirSync("./public/content/bands");
  const noMatch = [];

  for (const band of bandFiles) {
    const filePath = path.join("./public/content/bands", band);
    const data = fm(fs.readFileSync(filePath, "utf-8"));
    const { name: bandName, slug } = data.attributes;

    if (
      !fs.existsSync(`./public/img/bands/${slug}.webp`) &&
      !fs.existsSync(`./public/img/bands/${slug}.jpg`)
    ) {
      const bcResult = await search.artistsAndLabels({
        query: bandName,
        artistImageFormat: "bio_screen",
      });
      if (bcResult.items.length > 0) {
        const { name: resultName, imageUrl } = bcResult.items[0];
        const match = cmpstr.diceCoefficient(bandName, resultName);
        if (match > 0.8) {
          await downloadImage(imageUrl, `./public/img/${slug}.jpg`, bandName);
        } else noMatch.push(bandName);
      } else noMatch.push(bandName);
    }
  }

  console.log("Couldn't find a match for:");
  for (const name of noMatch) console.log(name);
}

async function downloadImage(url, savePath, name) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(savePath);
    response.data.pipe(file);

    file.on("finish", () => {
      console.log(`Downloaded image for ${name}`);
      file.close(resolve);
    });

    file.on("error", (err) => {
      fs.unlink(savePath, () => reject(err));
    });
  });
}

await getAllBands();
