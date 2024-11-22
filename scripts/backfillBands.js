import fs from "fs";
import path from "path";
import fm from "front-matter";
import yaml from "js-yaml";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function confirmPrompt(message) {
  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

async function getAllBands() {
  console.log("getall");
  const bandList = [];

  const festivalFiles = fs.readdirSync("./public/content/festivals");

  festivalFiles.forEach((file) => {
    const filePath = path.join("./public/content/festivals", file);
    const data = fm(fs.readFileSync(filePath, "utf-8"));
    if (data.attributes.lineup) bandList.push(...data.attributes.lineup);
  });
  return bandList;
}

async function getMissingBands() {
  const fullBandList = await getAllBands();
  const bandFiles = fs.readdirSync("./public/content/bands");
  const existingBandNames = [];
  const missingBands = [];

  bandFiles.forEach((file) => {
    existingBandNames.push(path.basename(file, ".md"));
  });

  fullBandList.forEach((band) => {
    if (!existingBandNames.includes(band)) {
      missingBands.push(band);
    }
  });

  return missingBands;
}

function createBand(band) {
  const newBand = {
    name: band
      .split("-")
      .map((term) => term.charAt(0).toUpperCase() + term.slice(1))
      .join(" "),
    slug: band,
    url: "",
    photo: `/img/bands/${band}.webp`,
  };

  const toYaml = yaml.dump(newBand, { indent: 2 });
  const toMarkdown = `---\n${toYaml}---\n`;

  fs.writeFile(
    path.join(process.cwd(), `/public/content/bands/${band}.md`),
    toMarkdown,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Saved ${band}.md`);
    },
  );
}

(async () => {
  const missingBands = await getMissingBands();
  if (missingBands.length === 0) {
    console.log("Nothing to add, exiting...");
    process.exit(0);
  }
  console.log("Adding missing bands:");
  console.dir(missingBands);
  const confirmed = await confirmPrompt("Proceed?");
  if (confirmed) {
    missingBands.forEach(createBand);
  } else {
    console.log("Exiting...");
    process.exit(0);
  }
})();