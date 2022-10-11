const generateToken = () => Math.random().toFixed(16).replace('0.', '');

module.exports = {
  generateToken,
};
