const anotherId = (response) => {
  const newTalkerId = response
    .map((talker) => talker.id)
    .sort((a, b) => b - a);

  return newTalkerId[0] + 1; 
};

module.exports = anotherId;