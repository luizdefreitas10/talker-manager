const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const fsReadFile = async () => {
  try {
    const response = await fs.readFile(talkerPath);
    const talkerManager = await JSON.parse(response);
    return talkerManager;
  } catch (error) {
    console.log(error);
  }
};

// const readTalkerFile = async () => {
//   try {
//     const talker = JSON.parse(await fs.readFile(pathTalker));
//     return talker;
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  fsReadFile,
};