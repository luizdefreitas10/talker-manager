const express = require('express');

const { fsReadFile } = require('../utils/fs');

const router = express.Router();
router.use(express.json());

// 1 
router.get('/', async (_req, res) => {
  const talkerManager = await fsReadFile();
  return res.status(200).json(talkerManager);
});

module.exports = router;