const express = require('express');

const { fsReadFile, fsReadFileById, fsWriteFile } = require('../utils/fs');

const { 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation, 
} = require('../middlewares/talkerValidation');

const router = express.Router();
router.use(express.json());

// 1 
router.get('/', async (_req, res) => {
  const talkerManager = await fsReadFile();
  return res.status(200).json(talkerManager);
});

// 2 
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await fsReadFileById(id);
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// 5 

router.post('/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const newTalker = await fsWriteFile(req.body);
    return res.status(201).json(newTalker);
});

module.exports = router;