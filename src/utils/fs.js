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

const fsReadFileById = async (id) => {
  try {
    const response = await fsReadFile();
    const talkerId = response.find((talker) => talker.id === Number(id));
    return talkerId;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fsReadFile,
  fsReadFileById,
};