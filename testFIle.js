import fs from "node:fs/promises";
const readPjons = async () => {
  const pjsonPath = new URL("./package.json", import.meta.url);
  console.log(JSON.parse(await fs.readFile(pjsonPath, "utf-8")));
};

const writeFile = async () => {
  const newFile = new URL("./demo.js", import.meta.url)
  await fs.writeFile(newFile, `console.log("hello")`)
}

readPjons();
writeFile()