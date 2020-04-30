const notFound = (req, res, next) => {

  res.status(404);
  res.statusMessage = 'Resource Not Found';
  console.log(res.statusMessage);
  res.end();
};

module.exports = notFound;