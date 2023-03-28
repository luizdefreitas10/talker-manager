const express = require('express');

const {
  fsReadFile,
  fsReadFileById,
  fsWriteFile,
  fsUpdateTalkerById,
  fsDeleteTalkerById,
  fsSearchTalker,
} = require('../utils/fs');

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

// 6 
router.put('/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const { id } = req.params;
    const talker = await fsUpdateTalkerById(id, req.body);
    return res.status(200).json(talker);
  });

// 7 
router.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  await fsDeleteTalkerById(id);
  return res.status(204).end();
});

// 8 
router.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const talker = await fsSearchTalker(q);
  return res.status(200).json(talker);
});

module.exports = router;