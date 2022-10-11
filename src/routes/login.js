const express = require('express');
const { loginValidation } = require('../middlewares/loginValidation');
const { generateToken } = require('../utils/generateToken');

const router = express.Router();
router.use(express.json());

// 3 e 4
router.post('/', loginValidation, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = router;