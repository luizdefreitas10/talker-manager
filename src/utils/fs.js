const fs = require('fs').promises;
const path = require('path');
const anotherId = require('./generateId');

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

const fsWriteFile = async (talker) => {
  try {
    const response = await fsReadFile();
    const anotherTalker = { ...talker, id: anotherId(response) };
    const talkers = JSON.stringify([...response, anotherTalker]);
    await fs.writeFile(talkerPath, talkers);
    return anotherTalker;
  } catch (error) {
    console.log(error);
  }
};

const fsUpdateTalkerById = async (id, body) => {
  try {
    const response = await fsReadFile();
    const data = response.findIndex((talker) => talker.id === Number(id));
    response[data] = { id: Number(id), ...body };
    const updatedData = response[data];
    await fs.writeFile(talkerPath, JSON.stringify(response));
    return updatedData;
  } catch (error) {
    console.log(error);
  }
};

const fsDeleteTalkerById = async (id) => {
  try {
    const response = await fsReadFile();
    const data = response.filter((talker) => talker.id !== Number(id));
    console.log(data);
    await fs.writeFile(talkerPath, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fsReadFile,
  fsReadFileById,
  fsWriteFile,
  fsUpdateTalkerById,
  fsDeleteTalkerById,
};